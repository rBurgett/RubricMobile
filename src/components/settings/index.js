import { connect } from 'react-redux';
import Settings from './settings';
import * as appActions from '../../actions/app-actions';
import Storage from '../../modules/storage';
import { storageKeys } from '../../constants';

export default connect(
  ({ appState }) => ({
    hideMorningPrayer: appState.hideMorningPrayer,
    hideDailyReading: appState.hideDailyReading,
    hideNoonPrayer: appState.hideNoonPrayer,
    hideEarlyEveningPrayer: appState.hideEarlyEveningPrayer,
    hideCloseOfDayPrayer: appState.hideCloseOfDayPrayer,
    fontSize: appState.fontSize,
    lineHeight: appState.lineHeight
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
    }
  })
)(Settings);
