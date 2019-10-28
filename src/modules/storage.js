import AsyncStorage from '@react-native-community/async-storage';

class Storage {

  static async getItem(key) {
    const json = await AsyncStorage.getItem(key);
    if(!json) return json;
    return JSON.parse(json);
  }

  static async setItem(key, val) {
    await AsyncStorage.setItem(key, JSON.stringify(val));
    return key;
  }

  static getAllKeys() {
    return AsyncStorage.getAllKeys();
  }

}

export default Storage;
