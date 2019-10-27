import React from 'react';
import { Root } from 'native-base';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import appReducer from './reducers/app-reducer';
import { routes as routeConstants } from './constants';
import Home from './components/home';
import Prayer from './components/prayer';
// import db from './modules/db';

const combinedReducers = combineReducers({
  appState: appReducer
});

const store = createStore(combinedReducers);
store.subscribe(() => {
  const state = store.getState();
  console.log('state', state.appState);
});

const routes = {
  [routeConstants.HOME]: {
    screen: Home,
    headerMode: 'none',
    navigationOptions: () => ({
      header: null
    })
  },
  [routeConstants.PRAYER]: {
    screen: Prayer
  }
};
const stackConfig = {
  initialRouteName: routeConstants.HOME
};
const StackNavigation = createStackNavigator(routes, stackConfig);
const AppContainer = createAppContainer(StackNavigation);

const App: () => React$Node = () => {
  return (
    <Root>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </Root>
  );
};

export default App;
