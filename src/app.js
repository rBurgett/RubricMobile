import React, { useState, useEffect } from 'react';
import { Root } from 'native-base';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import moment from 'moment';
import PushNotification from 'react-native-push-notification';
import appReducer from './reducers/app-reducer';
import * as appActions from './actions/app-actions';
import {
  BASE_FONT_SIZE,
  colors, defaultTimes,
  fontTypes,
  notificationIds,
  routes as routeConstants,
  storageKeys
} from './constants';
import Home from './components/home';
import Prayer from './components/prayer';
import DailyReading from './components/daily-reading';
import Settings from './components/settings';
import Container from './components/shared/container';
import Storage from './modules/storage';
import Progress from './types/progress';
import Menu from './components/menu';
import Welcome from './components/welcome';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import Bible from './components/bible';
import BibleBook from './components/bible-book';
import BibleBookChapter from './components/bible-book-chapter';
import Bookmarks from './components/bookmarks';
import { scheduleLocalNotification } from './modules/notifications';
import Platform from './modules/platform';

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
    screen: DailyReading,
    headerMode: 'none',
    navigationOptions: () => ({
      header: null
    })
  },
  [routeConstants.SETTINGS]: {
    screen: Settings
  },
  [routeConstants.BIBLE]: {
    screen: Bible
  },
  [routeConstants.BIBLE_BOOK]: {
    screen: BibleBook
  },
  [routeConstants.BIBLE_BOOK_CHAPTER]: {
    screen: BibleBookChapter,
    headerMode: 'none',
    navigationOptions: () => ({
      header: null
    })
  },
  [routeConstants.BOOKMARKS]: {
    screen: Bookmarks
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

        const darkMode = await Storage.getItem(storageKeys.DARK_MODE);
        store.dispatch(appActions.setDarkMode(darkMode || false));

        changeNavigationBarColor(darkMode ? colors.PRIMARY_DM : colors.PRIMARY_TEXT);

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
        const hideVerseNumbers = await Storage.getItem(storageKeys.HIDE_VERSE_NUMBERS);
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
        store.dispatch(appActions.setHideVerseNumbers(hideVerseNumbers || false));
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

        PushNotification.configure({
          onRegister(token) {
            console.log('token', token);
          },
          onNotification(notification) {
            console.log('notification', notification);
          },
          popInitialNotification: true,
          requestPermissions: true
        });

        setReady(true);

        const initialSchedulingDone = await Storage.getItem(storageKeys.INITIAL_SCHEDULING_DONE);

        let morningPrayerTime = await Storage.getItem(storageKeys.MORNING_PRAYER_TIME);
        morningPrayerTime = typeof morningPrayerTime === 'number' ? morningPrayerTime : defaultTimes.MORNING_PRAYER;
        store.dispatch(appActions.setMorningPrayerTime(morningPrayerTime));

        let dailyReadingTime = await Storage.getItem(storageKeys.DAILY_READING_TIME);
        dailyReadingTime = typeof dailyReadingTime === 'number' ? dailyReadingTime : defaultTimes.DAILY_READING;
        store.dispatch(appActions.setDailyReadingTime(dailyReadingTime));

        let noonPrayerTime = await Storage.getItem(storageKeys.NOON_PRAYER_TIME);
        noonPrayerTime = typeof noonPrayerTime === 'number' ? noonPrayerTime : defaultTimes.NOON_PRAYER;
        store.dispatch(appActions.setNoonPrayerTime(noonPrayerTime));

        let earlyEveningPrayerTime = await Storage.getItem(storageKeys.EARLY_EVENING_PRAYER_TIME);
        earlyEveningPrayerTime = typeof earlyEveningPrayerTime === 'number' ? earlyEveningPrayerTime : defaultTimes.EARLY_EVENING_PRAYER;
        store.dispatch(appActions.setEarlyEveningPrayerTime(earlyEveningPrayerTime));

        let closeOfDayPrayerTime = await Storage.getItem(storageKeys.CLOSE_OF_DAY_PRAYER_TIME);
        closeOfDayPrayerTime = typeof closeOfDayPrayerTime === 'number' ? closeOfDayPrayerTime : defaultTimes.CLOSE_OF_DAY_PRAYER;
        store.dispatch(appActions.setCloseOfDayPrayerTime(closeOfDayPrayerTime));

        if(!initialSchedulingDone) {
          if(Platform.isAndroid()) {
            scheduleLocalNotification(notificationIds.MORNING_PRAYER, morningPrayerTime);
            scheduleLocalNotification(notificationIds.DAILY_READING, dailyReadingTime);
            scheduleLocalNotification(notificationIds.NOON_PRAYER, noonPrayerTime);
            scheduleLocalNotification(notificationIds.EARLY_EVENING_PRAYER, earlyEveningPrayerTime);
            scheduleLocalNotification(notificationIds.CLOSE_OF_DAY_PRAYER, closeOfDayPrayerTime);
            await Storage.setItem(storageKeys.INITIAL_SCHEDULING_DONE, true);
          }
        }

      } catch(err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <Root>
      <Provider store={store}>
        {ready ? <AppContainer /> : <Container />}
      </Provider>
    </Root>
  );
};

export default App;
