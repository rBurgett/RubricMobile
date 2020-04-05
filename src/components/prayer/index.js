import { connect } from 'react-redux';
import Prayer from './prayer';
import { setProgress } from '../../actions/app-actions';

export default connect(
  ({ appState }) => ({
    morningPrayer: appState.morningPrayer,
    noonPrayer: appState.noonPrayer,
    earlyEveningPrayer: appState.earlyEveningPrayer,
    closeOfDayPrayer: appState.closeOfDayPrayer,
    fontType: appState.fontType,
    progress: appState.progress,
    morningPrayerTime: appState.morningPrayerTime,
    noonPrayerTime: appState.noonPrayerTime,
    earlyEveningPrayerTime: appState.earlyEveningPrayerTime,
    closeOfDayPrayerTime: appState.closeOfDayPrayerTime
  }),
  dispatch => ({
    setProgress: progress => dispatch(setProgress(progress))
  })
)(Prayer);
