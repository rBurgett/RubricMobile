import { connect } from 'react-redux';
import Menu from './menu';

export default connect(
  ({ appState }) => ({
    darkMode: appState.darkMode
  })
)(Menu);
