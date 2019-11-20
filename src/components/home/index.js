import { connect } from 'react-redux';
import Home from './home';
import { setWelcomeDone } from '../../actions/app-actions';
import Storage from '../../modules/storage';
import {storageKeys} from '../../constants';

export default connect(
  ({ appState }) => ({
    hideMorningPrayer: appState.hideMorningPrayer,
    hideDailyReading: appState.hideDailyReading,
    hideNoonPrayer: appState.hideNoonPrayer,
    hideEarlyEveningPrayer: appState.hideEarlyEveningPrayer,
    hideCloseOfDayPrayer: appState.hideCloseOfDayPrayer,
    fontType: appState.fontType,
    progress: appState.progress,
    welcomeDone: appState.welcomeDone,
    darkMode: appState.darkMode
  }),
  dispatch => ({
    setWelcomeDone: async function() {
      await Storage.setItem(storageKeys.WELCOME_DONE, true);
      dispatch(setWelcomeDone(true));
    }
  })
)(Home);
