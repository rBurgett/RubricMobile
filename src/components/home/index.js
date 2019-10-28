import { connect } from 'react-redux';
import Home from './home';

export default connect(
  ({ appState }) => ({
    hideMorningPrayer: appState.hideMorningPrayer,
    hideDailyReading: appState.hideDailyReading,
    hideNoonPrayer: appState.hideNoonPrayer,
    hideEarlyEveningPrayer: appState.hideEarlyEveningPrayer,
    hideCloseOfDayPrayer: appState.hideCloseOfDayPrayer
  })
)(Home);
