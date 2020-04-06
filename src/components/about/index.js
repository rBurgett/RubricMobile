import { connect } from 'react-redux';
import About from './about';

export default connect(
  ({ appState })=> ({
    darkMode: appState.darkMode,
    fontType: appState.fontType
  })
)(About);
