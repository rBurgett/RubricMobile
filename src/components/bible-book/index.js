import { connect } from 'react-redux';
import BibleBook from './bible-book';

export default connect(
  ({ appState }) => ({
    fontType: appState.fontType
  })
)(BibleBook);
