import { connect } from 'react-redux';
import Bible from './bible';

export default connect(
  ({ appState }) => ({
    fontType: appState.fontType
  })
)(Bible);
