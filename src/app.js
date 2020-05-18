import React, { useState, useEffect } from 'react';
import { AccessibilityInfo, Alert, AppState } from 'react-native';
import { Root } from 'native-base';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import moment from 'moment';
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
import Platform from './modules/platform';
import SplashScreen from 'react-native-splash-screen';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import { scheduleLocalNotification } from './modules/notifications';
import About from './components/about';

const createFluidNavigator = Platform.isAndroid() ? require('react-navigation-fluid-transitions').createFluidNavigator : null;

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
      headerShown: false
    })
  },
  [routeConstants.MENU]: {
    screen: Menu,
    headerMode: 'none',
    navigationOptions: () => ({
      headerShown: false
    })
  },
  [routeConstants.WELCOME]: {
    screen: Welcome,
    navigationOptions: () => ({
      headerShown: false
    })
  },
  [routeConstants.PRAYER]: {
    screen: Prayer,
    headerMode: 'none',
    navigationOptions: () => ({
      headerShown: false
    })
  },
  [routeConstants.DAILY_READING]: {
    screen: DailyReading,
    headerMode: 'none',
    navigationOptions: () => ({
      headerShown: false
    })
  },
  [routeConstants.SETTINGS]: {
    screen: Settings,
    headerMode: 'none',
    navigationOptions: () => ({
      headerShown: false
    })
  },
  [routeConstants.BIBLE]: {
    screen: Bible,
    navigationOptions: () => ({
      headerShown: false
    })
  },
  [routeConstants.BIBLE_BOOK]: {
    screen: BibleBook,
    navigationOptions: () => ({
      headerShown: false
    })
  },
  [routeConstants.BIBLE_BOOK_CHAPTER]: {
    screen: BibleBookChapter,
    headerMode: 'none',
    navigationOptions: () => ({
      headerShown: false
    })
  },
  [routeConstants.BOOKMARKS]: {
    screen: Bookmarks,
    navigationOptions: () => ({
      headerShown: false
    })
  },
  [routeConstants.ABOUT]: {
    screen: About,
    navigationOptions: () => ({
      headerShown: false
    })
  }
};
const stackConfig = {
  initialRouteName: routeConstants.HOME
};

let StackNavigation, AppContainer;

const onScreenReaderChanged = enabled => {
  store.dispatch(appActions.setScreenReaderEnabled(enabled));
};

const startupProcess = async function(freshStart, setReady) {
  try {

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

    const screenReaderEnabled = await AccessibilityInfo.isScreenReaderEnabled();
    store.dispatch(appActions.setScreenReaderEnabled(screenReaderEnabled));

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

    // This following will only run if the app is opened for the first time
    // rather than just brought to the foreground from the background
    if(!freshStart) return;

    AccessibilityInfo.addEventListener('screenReaderChanged', onScreenReaderChanged);

    if(Platform.isAndroid()) {
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
    } else if(Platform.isIOS()) {
      PushNotification.configure({
        onRegister: function(token) {
          console.log('token', token);
        },
        // (required) Called when a remote or local notification is opened or received
        onNotification: function(notification) {
          console.log('notification', notification);
          // process the notification
          // required on iOS only (see fetchCompletionHandler docs: https://github.com/react-native-community/react-native-push-notification-ios)
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        },
        // IOS ONLY (optional): default: all - Permissions to register.
        permissions: {
          alert: true,
          badge: true,
          sound: true
        },
        // Should the initial notification be popped automatically
        popInitialNotification: true,
        /**
         * (optional) default: true
         * - Specified if permissions (ios) and token (android and ios) will requested or not,
         * - if not, you must call PushNotificationsHandler.requestPermissions() later
         */
        requestPermissions: true
      });
    }

    setReady(true);

    setTimeout( () => {
      SplashScreen.hide();
    }, 0);

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
      const interval = setInterval(() => {
        PushNotification.checkPermissions(async function({ alert, badge, sound }) {
          try {
            if(alert || badge || sound) {
              clearInterval(interval);
              scheduleLocalNotification(notificationIds.MORNING_PRAYER, morningPrayerTime);
              scheduleLocalNotification(notificationIds.DAILY_READING, dailyReadingTime);
              scheduleLocalNotification(notificationIds.NOON_PRAYER, noonPrayerTime);
              scheduleLocalNotification(notificationIds.EARLY_EVENING_PRAYER, earlyEveningPrayerTime);
              scheduleLocalNotification(notificationIds.CLOSE_OF_DAY_PRAYER, closeOfDayPrayerTime);
              await Storage.setItem(storageKeys.INITIAL_SCHEDULING_DONE, true);
            }
          } catch(err) {
            console.error(err);
          }
        });
      }, 1000);
    }

  } catch(err) {
    console.error(err);
  }
};

const App: () => React$Node = () => {

  const [ ready, setReady ] = useState(false);

  useEffect(() => {
    (async function() {
      try {

        let darkMode = await Storage.getItem(storageKeys.DARK_MODE);
        darkMode = (darkMode || darkMode === null) ? true : false;
        store.dispatch(appActions.setDarkMode(darkMode));

        if(!darkMode || Platform.isIOS()) {
          StackNavigation = createStackNavigator(routes, stackConfig);
          AppContainer = createAppContainer(StackNavigation);
        } else { // if dark mode on Android
          StackNavigation = createFluidNavigator(routes, stackConfig);
          AppContainer = createAppContainer(StackNavigation);
        }

        changeNavigationBarColor(darkMode ? colors.PRIMARY_DM : colors.PRIMARY_TEXT);

        let freshStart = true;

        startupProcess(freshStart, setReady);

        freshStart = false;

        let appState = AppState.currentState;

        AppState.addEventListener('change', nextAppState => {
          try {
            if(!['unknown', 'active'].some(s => appState === s) && nextAppState === 'active') {
              startupProcess(freshStart, setReady);
            }
            appState = nextAppState;
          } catch(err) {
            console.error(err);
          }
        });

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
