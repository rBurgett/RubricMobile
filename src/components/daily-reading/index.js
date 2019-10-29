import { connect } from 'react-redux';
import DailyReading from './daily-reading';

export default connect(
  ({ appState }) => ({
    fontSize: appState.fontSize,
    lineHeight: appState.lineHeight
  })
)(DailyReading);
