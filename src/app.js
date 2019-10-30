import React, { useState, useEffect } from 'react';
import { Root } from 'native-base';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import appReducer from './reducers/app-reducer';
import * as appActions from './actions/app-actions';
import { BASE_FONT_SIZE, routes as routeConstants, storageKeys } from './constants';
import Home from './components/home';
import Prayer from './components/prayer';
import DailyReading from './components/daily-reading';
import Settings from './components/settings';
import Container from './components/shared/container';
import Storage from './modules/storage';

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
  },
  [routeConstants.DAILY_READING]: {
    screen: DailyReading
  },
  [routeConstants.SETTINGS]: {
    screen: Settings
  }
};
const stackConfig = {
  initialRouteName: routeConstants.HOME
};
const StackNavigation = createStackNavigator(routes, stackConfig);
const AppContainer = createAppContainer(StackNavigation);

const App: () => React$Node = () => {

  const [ ready, setReady ] = useState(false);

  useEffect(() => {
    (async function() {
      try {
        const hideMorningPrayer = await Storage.getItem(storageKeys.HIDE_MORNNG_PRAYER);
        const hideDailyReading = await Storage.getItem(storageKeys.HIDE_DAILY_READING);
        const hideNoonPrayer = await Storage.getItem(storageKeys.HIDE_NOON_PRAYER);
        const hideEarlyEveningPrayer = await Storage.getItem(storageKeys.HIDE_EARLY_EVENING_PRAYER);
        const hideCloseOfDayPrayer = await Storage.getItem(storageKeys.HIDE_CLOSE_OF_DAY_PRAYER);
        store.dispatch(appActions.setHideMorningPrayer(hideMorningPrayer));
        store.dispatch(appActions.setHideDailyReading(hideDailyReading));
        store.dispatch(appActions.setHideNoonPrayer(hideNoonPrayer));
        store.dispatch(appActions.setHideEarlyEveningPrayer(hideEarlyEveningPrayer));
        store.dispatch(appActions.setHideCloseOfDayPrayer(hideCloseOfDayPrayer));
        const fontSize = await Storage.getItem(storageKeys.FONT_SIZE);
        store.dispatch(appActions.setFontSize(fontSize || BASE_FONT_SIZE));
        const lineHeight = await Storage.getItem(storageKeys.LINE_HEIGHT);
        store.dispatch(appActions.setLineHeight(lineHeight || 1.5));
        setReady(true);
      } catch(err) {
        console.error(err);
      }
    })();
  }, []);

  if(!ready) return <Container />;

  return (
    <Root>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </Root>
  );
};

export default App;
