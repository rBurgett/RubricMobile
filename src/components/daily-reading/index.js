import { connect } from 'react-redux';
import DailyReading from './daily-reading';
import { setProgress } from '../../actions/app-actions';

export default connect(
  ({ appState }) => ({
    fontSize: appState.fontSize,
    lineHeight: appState.lineHeight,
    fontType: appState.fontType,
    hideVerseNumbers: appState.hideVerseNumbers,
    dailyReadingTime: appState.dailyReadingTime,
    progress: appState.progress
  }),
  dispatch => ({
    setProgress: progress => dispatch(setProgress(progress))
  })
)(DailyReading);
