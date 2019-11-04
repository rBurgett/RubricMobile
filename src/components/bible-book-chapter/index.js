import { connect } from 'react-redux';
import BibleBookChapter from './bible-book-chapter';

export default connect(
  ({ appState }) => ({
    fontSize: appState.fontSize,
    lineHeight: appState.lineHeight,
    fontType: appState.fontType,
    hideVerseNumbers: appState.hideVerseNumbers
  })
)(BibleBookChapter);
