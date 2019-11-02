import React, { useState, useEffect } from 'react';
import { Root } from 'native-base';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import appReducer from './reducers/app-reducer';
import * as appActions from './actions/app-actions';
import {BASE_FONT_SIZE, colors, fontTypes, routes as routeConstants, storageKeys} from './constants';
import Home from './components/home';
import Prayer from './components/prayer';
import DailyReading from './components/daily-reading';
import Settings from './components/settings';
import Container from './components/shared/container';
import Storage from './modules/storage';
import moment from 'moment';
import Progress from './types/progress';
import Menu from './components/menu';
import Welcome from './components/welcome';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

const combinedReducers = combineReducers({
  appState: appReducer
});

const store = createStore(combinedReducers);
store.subscribe(() => {
  // const state = store.getState();
  // console.log('state', state.appState);
});

const routes = {
  [routeConstants.HOME]: {
    screen: Home,
    headerMode: 'none',
    navigationOptions: () => ({
      header: null
    })
  },
  [routeConstants.MENU]: {
    screen: Menu
  },
  [routeConstants.WELCOME]: {
    screen: Welcome
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

        changeNavigationBarColor(colors.BROWN);

        const date = moment();
        const day = date.format('DD');
        const month = date.format('MM');
        const year = date.format('YYYY');
        const progressKey = `prog_${year}-${month}-${day}`;
        const progressData = await Storage.getItem(progressKey);
        const progress = new Progress(progressData || {key: progressKey});
        if(!progressData) await Storage.setItem(progressKey, progress);
        const hideMorningPrayer = await Storage.getItem(storageKeys.HIDE_MORNNG_PRAYER);
        const hideDailyReading = await Storage.getItem(storageKeys.HIDE_DAILY_READING);
        const hideNoonPrayer = await Storage.getItem(storageKeys.HIDE_NOON_PRAYER);
        const hideEarlyEveningPrayer = await Storage.getItem(storageKeys.HIDE_EARLY_EVENING_PRAYER);
        const hideCloseOfDayPrayer = await Storage.getItem(storageKeys.HIDE_CLOSE_OF_DAY_PRAYER);
        const fontSize = await Storage.getItem(storageKeys.FONT_SIZE);
        const lineHeight = await Storage.getItem(storageKeys.LINE_HEIGHT);
        const fontType = await Storage.getItem(storageKeys.FONT_TYPE);
        const welcomeDone = await Storage.getItem(storageKeys.WELCOME_DONE);
        store.dispatch(appActions.setWelcomeDone(welcomeDone || false));
        store.dispatch(appActions.setFontSize(fontSize || BASE_FONT_SIZE));
        store.dispatch(appActions.setLineHeight(lineHeight || 1.5));
        store.dispatch(appActions.setFontType(fontType || fontTypes.SERIF));
        store.dispatch(appActions.setProgress(progress));
        store.dispatch(appActions.setHideMorningPrayer(hideMorningPrayer));
        store.dispatch(appActions.setHideDailyReading(hideDailyReading));
        store.dispatch(appActions.setHideNoonPrayer(hideNoonPrayer));
        store.dispatch(appActions.setHideEarlyEveningPrayer(hideEarlyEveningPrayer));
        store.dispatch(appActions.setHideCloseOfDayPrayer(hideCloseOfDayPrayer));
        const currentMorningPrayer = await Storage.getItem(storageKeys.MORNING_PRAYER);
        const currentNoonPrayer = await Storage.getItem(storageKeys.NOON_PRAYER);
        const currentEarlyEveningPrayer = await Storage.getItem(storageKeys.EARLY_EVENING_PRAYER);
        const currentCloseOfDayPrayer = await Storage.getItem(storageKeys.CLOSE_OF_DAY_PRAYER);
        if(currentMorningPrayer && currentNoonPrayer && currentEarlyEveningPrayer && currentCloseOfDayPrayer) {
          store.dispatch(appActions.bulkSet({
            morningPrayer: currentMorningPrayer,
            noonPrayer: currentNoonPrayer,
            earlyEveningPrayer: currentEarlyEveningPrayer,
            closeOfDayPrayer: currentCloseOfDayPrayer
          }));
        }
        fetch('https://rubric.church/prayers')
          .then(async function(res) {
            try {
              const { data: prayers } = await res.json();
              let toSet = {};
              const morningPrayer = prayers.find(p => p.time === 'morning').text;
              if(morningPrayer !== currentMorningPrayer) {
                await Storage.setItem(storageKeys.MORNING_PRAYER, morningPrayer);
                toSet = {...toSet, morningPrayer};
              }
              const noonPrayer = prayers.find(p => p.time === 'afternoon').text;
              if(noonPrayer !== currentNoonPrayer) {
                await Storage.setItem(storageKeys.NOON_PRAYER, noonPrayer);
                toSet = {...toSet, noonPrayer};
              }
              const earlyEveningPrayer = prayers.find(p => p.time === 'earlyEvening').text;
              if(earlyEveningPrayer !== currentEarlyEveningPrayer) {
                await Storage.setItem(storageKeys.EARLY_EVENING_PRAYER, earlyEveningPrayer);
                toSet = {...toSet, earlyEveningPrayer};
              }
              const closeOfDayPrayer = prayers.find(p => p.time === 'closeOfDay').text;
              if(closeOfDayPrayer !== currentCloseOfDayPrayer) {
                await Storage.setItem(storageKeys.CLOSE_OF_DAY_PRAYER, closeOfDayPrayer);
                toSet = {...toSet, closeOfDayPrayer};
              }
              store.dispatch(appActions.bulkSet(toSet));
            } catch(err) {
              console.error(err);
            }
          })
          .catch(console.error);

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
