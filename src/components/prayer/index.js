import { connect } from 'react-redux';
import Prayer from './prayer';
import { setProgress } from '../../actions/app-actions';

export default connect(
  ({ appState }) => ({
    morningPrayer: appState.morningPrayer,
    noonPrayer: appState.noonPrayer,
    earlyEveningPrayer: appState.earlyEveningPrayer,
    closeOfDayPrayer: appState.closeOfDayPrayer,
    progress: appState.progress
  }),
  dispatch => ({
    setProgress: progress => dispatch(setProgress(progress))
  })
)(Prayer);
