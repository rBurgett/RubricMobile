import AsyncStorage from '@react-native-community/async-storage';
import escapeRegExp from 'lodash/escapeRegExp';
import uniq from 'lodash/uniq';
import uuid from'uuid';

class DBTable {

  _name = '';
  _prefix = '';
  _idPatt = null;
  _indexes = [];
  _indexData = {};
  _idToIndexData = new Map();
  _Initializer = null;

  constructor(dbName, tableName, indexes, Initializer) {
    const prefix = dbName + '-' + tableName + 'Table';
    this._prefix = prefix;
    this._idPatt = new RegExp('^' + escapeRegExp(prefix + '-') + '(.+)$')
    this._name = tableName;
    this._indexes = indexes;
    if(indexes.length === 0) throw new Error('You must pass in at least one index when initializing a database table.');
    this._Initializer = Initializer;
  }

  async initialize() {
    const prefix = this._prefix;
    const keys = await AsyncStorage.getAllKeys();
    const prefixPatt = new RegExp('^' + escapeRegExp(prefix + '-'));
    const filtered = keys
      .filter(key => prefixPatt.test(key));
    const items = await AsyncStorage.multiGet(filtered);
    const indexes = this._indexes;
    const indexData = indexes.reduce((obj, i) => ({...obj, [i]: new Map()}), {});
    const idToIndexData = new Map();
    for(const [key, itemStr] of items) {
      const item = JSON.parse(itemStr);
      const { _id } = item;
      for(const index of indexes) {
        const value = item[index];
        const found = indexData[index].get(value) || [];
        indexData[index].set(value, [...found, key]);
        if(idToIndexData.has(_id)) {
          idToIndexData.get(_id).push([index, value, key]);
        } else {
          idToIndexData.set(_id, [[index, value, key]]);
        }
      }
    }
    this._indexData = indexData;
    this._idToIndexData = idToIndexData;
  }

  _getIdFromKey(key = '') {
    const matches = key.match(this._idPatt);
    if(matches) return matches[1];
    else return '';
  }

  async find(query = {}) {
    const { _Initializer } = this;
    const queryKeys = Object.keys(query);
    const indexData = this._indexData;
    let ids = [];
    if(queryKeys.length === 0) {
      ids = [...indexData._id.values()]
        .reduce((arr, a) => arr.concat(a), []);
    } else {
      for(const key of queryKeys) {
        const value = query[key];
        const found = indexData[key].get(value) || [];
        ids = ids.concat(found);
      }
    }
    const res = await AsyncStorage.multiGet(uniq(ids));
    const items = res.map(a => JSON.parse(a[1]));
    return _Initializer ? items.map(i => new _Initializer(i)) : items;
  }

  async findOne(query = {}) {
    const { _Initializer } = this;
    const queryKeys = Object.keys(query);
    const indexData = this._indexData;
    const key = queryKeys[0];
    const value = query[key];
    const found = indexData[key].get(value) || [];
    if(found.length === 0) return null;
    const itemStr = await AsyncStorage.getItem(found[0]);
    const item = JSON.parse(itemStr);
    return _Initializer ? new _Initializer(item) : item;
  }

  async insert(doc = {}) {
    const prefix = this._prefix;
    const { _id = uuid.v4() } = doc;
    const key = prefix + '-' + _id;
    doc = {
      ...doc,
      _id
    };
    await AsyncStorage.setItem(key, JSON.stringify(doc));
    this._idToIndexData.set(_id, []);
    for(const index of this._indexes) {
      const keys = this._indexData[index].get(doc[index]) || [];
      this._indexData[index].set(doc[index], [...keys, key]);
      this._idToIndexData.get(_id).push([index, doc[index], key]);
    }
    return _id;
  }

  async put(doc = {}) {
    // let { _id } = doc;
    // let item;
    // if(_id) {
    //   item = await this.findOne({_id});
    // } else {
    //   _id = uuid.v4();
    // }
    // if(item) await this.remove({_id});
    // await this.insert({
    //   ...doc,
    //   _id
    // });
    // // ToDo Update indexes
    // return _id;
  }

  async update(query, changes) {
    const prefix = this._prefix;
    const items = await this.find(query);
    const updatedItems = items
      .reduce((arr, item) => {
        const key = prefix + '-' + item._id;
        const newItem = {...item, ...changes};
        return [...arr, [key, newItem]];
      }, []);
    await AsyncStorage.multiSet(updatedItems.map(([ key, item ]) => [key, JSON.stringify(item)]));

    // Update Indexes
    const indexData = this._indexData;
    for(const [, item] of updatedItems) {
      const indexLocations = this._idToIndexData.get(item._id);
      const newIndexLocations = [];
      for(const [ index, value, key ] of indexLocations) {
        const newValue = item[index];
        if(newValue === value) {
          newIndexLocations.push([index, value, key]);
          continue;
        } else {
          const keys = indexData[index].get(value);
          const filteredKeys = keys.filter(k => k !== key);
          if(filteredKeys.length > 0) {
            indexData[index].set(value, filteredKeys);
          } else {
            indexData[index].delete(value);
          }
          if(indexData[index].has(newValue)) {
            indexData[index].get(newValue).push(key);
          } else {
            indexData[index].set(newValue, [key]);
          }
        }
      }
      this._idToIndexData.set(item._id, newIndexLocations);
    }

    return updatedItems.length;
  }

  async remove(query = {}) {
    const queryKeys = Object.keys(query);
    const indexData = this._indexData;
    let ids = [];
    for(const key of queryKeys) {
      const value = query[key];
      const found = indexData[key].get(value) || [];
      ids = ids.concat(found);
    }
    const { length } = ids;
    ids = uniq(ids);
    if(length > 0) await AsyncStorage.multiRemove(ids);

    // Update Indexes
    for(const id of ids) {
      const _id = this._getIdFromKey(id);
      if(!_id) continue;
      const indexLocations = this._idToIndexData.get(_id);
      for(const [ index, value, key ] of indexLocations) {
        const keys = indexData[index].get(value);
        const filteredKeys = keys.filter(k => k !== key);
        if(filteredKeys.length > 0) {
          indexData[index].set(value, filteredKeys);
        } else {
          indexData[index].delete(value);
        }
      }
      this._idToIndexData.delete(_id);
    }
    return length;
  }

}

class DB {

  async initialize(dbName, tables = []) {
    for(const { name, indexes = [], initializer } of tables) {
      const table = new DBTable(dbName, name, indexes, initializer);
      await table.initialize();
      this[name] = table;
    }
  }

}

export default new DB();
