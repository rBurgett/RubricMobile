import React from 'react';
import { SafeAreaView } from 'react-native';
import { Root, H1 } from 'native-base';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import Icon from './components/shared/icon';
import appReducer from './reducers/app-reducer';
import db from './modules/db';

const combinedReducers = combineReducers({
  appState: appReducer
});

const store = createStore(combinedReducers);
store.subscribe(() => {
  const state = store.getState();
  console.log('state', state.appState);
});

const App: () => React$Node = () => {
  return (
    <SafeAreaView>
      <Root>
        <Provider store={store}>
          <Icon>play</Icon>
          <H1>Hello</H1>
        </Provider>
      </Root>
    </SafeAreaView>
  );
};

export default App;
