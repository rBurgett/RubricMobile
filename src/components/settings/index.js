import { connect } from 'react-redux';
import Settings from './settings';
import * as appActions from '../../actions/app-actions';
import Storage from '../../modules/storage';
import {colors, storageKeys} from '../../constants';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

export default connect(
  ({ appState }) => ({
    hideMorningPrayer: appState.hideMorningPrayer,
    hideDailyReading: appState.hideDailyReading,
    hideNoonPrayer: appState.hideNoonPrayer,
    hideEarlyEveningPrayer: appState.hideEarlyEveningPrayer,
    hideCloseOfDayPrayer: appState.hideCloseOfDayPrayer,
    fontSize: appState.fontSize,
    lineHeight: appState.lineHeight,
    hideVerseNumbers: appState.hideVerseNumbers,
    fontType: appState.fontType,
    morningPrayerTime: appState.morningPrayerTime,
    dailyReadingTime: appState.dailyReadingTime,
    noonPrayerTime: appState.noonPrayerTime,
    earlyEveningPrayerTime: appState.earlyEveningPrayerTime,
    closeOfDayPrayerTime: appState.closeOfDayPrayerTime,
    darkMode: appState.darkMode
  }),
  dispatch => ({
    setHideMorningPrayer: hide => {
      Storage.setItem(storageKeys.HIDE_MORNNG_PRAYER, hide);
      dispatch(appActions.setHideMorningPrayer(hide));
    },
    setHideDailyReading: hide => {
      Storage.setItem(storageKeys.HIDE_DAILY_READING, hide);
      dispatch(appActions.setHideDailyReading(hide));
    },
    setHideNoonPrayer: hide => {
      Storage.setItem(storageKeys.HIDE_NOON_PRAYER, hide);
      dispatch(appActions.setHideNoonPrayer(hide));
    },
    setHideEarlyEveningPrayer: hide => {
      Storage.setItem(storageKeys.HIDE_EARLY_EVENING_PRAYER, hide);
      dispatch(appActions.setHideEarlyEveningPrayer(hide));
    },
    setHideCloseOfDayPrayer: hide => {
      Storage.setItem(storageKeys.HIDE_CLOSE_OF_DAY_PRAYER, hide);
      dispatch(appActions.setHideCloseOfDayPrayer(hide));
    },
    setFontSize: fontSize => {
      Storage.setItem(storageKeys.FONT_SIZE, fontSize);
      dispatch(appActions.setFontSize(fontSize));
    },
    setLineHeight: lineHeight => {
      Storage.setItem(storageKeys.LINE_HEIGHT, lineHeight);
      dispatch(appActions.setLineHeight(lineHeight));
    },
    setFontType: fontType => {
      Storage.setItem(storageKeys.FONT_TYPE, fontType);
      dispatch(appActions.setFontType(fontType));
    },
    setHideVerseNumbers: hideVerseNumbers => {
      Storage.setItem(storageKeys.HIDE_VERSE_NUMBERS, hideVerseNumbers);
      dispatch(appActions.setHideVerseNumbers(hideVerseNumbers));
    },
    setMorningPrayerTime: morningPrayerTime => {
      Storage.setItem(storageKeys.MORNING_PRAYER_TIME, morningPrayerTime);
      dispatch(appActions.setMorningPrayerTime(morningPrayerTime));
    },
    setDailyReadingTime: dailyReadingTime => {
      Storage.setItem(storageKeys.DAILY_READING_TIME, dailyReadingTime);
      dispatch(appActions.setDailyReadingTime(dailyReadingTime));
    },
    setNoonPrayerTime: noonPrayerTime => {
      Storage.setItem(storageKeys.NOON_PRAYER_TIME, noonPrayerTime);
      dispatch(appActions.setNoonPrayerTime(noonPrayerTime));
    },
    setEarlyEveningPrayerTime: earlyEveningPrayerTime => {
      Storage.setItem(storageKeys.EARLY_EVENING_PRAYER_TIME, earlyEveningPrayerTime);
      dispatch(appActions.setEarlyEveningPrayerTime(earlyEveningPrayerTime));
    },
    setCloseOfDayPrayerTime: closeOfDayPrayerTime => {
      Storage.setItem(storageKeys.CLOSE_OF_DAY_PRAYER_TIME, closeOfDayPrayerTime);
      dispatch(appActions.setCloseOfDayPrayerTime(closeOfDayPrayerTime));
    },
    setDarkMode: async function(darkMode, onlySave = false) {
      await Storage.setItem(storageKeys.DARK_MODE, darkMode);
      if(onlySave) { // only save the dark mode value but don't render anything
        return;
      }
      dispatch(appActions.setDarkMode(darkMode));
      changeNavigationBarColor(darkMode ? colors.PRIMARY_DM : colors.PRIMARY_TEXT);
    }
  })
)(Settings);
