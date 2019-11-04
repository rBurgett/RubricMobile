import { connect } from 'react-redux';
import Bookmarks from './bookmarks';

export default connect(
  ({ appState }) => ({
    fontType: appState.fontType
  })
)(Bookmarks);
