import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Content } from 'native-base';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Entities from 'html-entities';
import omit from 'lodash/omit';
import Container from '../shared/container';
import Header from '../shared/header';
import {colors, fontFamily, routes, storageKeys} from '../../constants';
import Button from '../shared/button';
import { getChapterText } from '../../util';
import Storage from '../../modules/storage';
import { handleError, makeBookmarkKey, prepText } from '../util';

const entities = new Entities.AllHtmlEntities();

const BibleBookChapter = ({ navigation, fontSize, lineHeight, fontType, hideVerseNumbers }) => {

  lineHeight = lineHeight * fontSize;

  const { book, chapter, totalChapters } = navigation.state.params;

  const [ paragraphs, setParagraphs ] = useState([]);
  const [ bookmarked, setBookmarked ] = useState(false);

  useEffect(() => {
    setParagraphs(getChapterText(book, chapter));
    const bookmarkKey = makeBookmarkKey(book, chapter);
    Storage.getItem(storageKeys.BOOKMARKS)
      .then(bookmarks => {
        if(bookmarks && bookmarks[bookmarkKey]) {
          setBookmarked(true);
        }
      })
      .catch(handleError);
  }, [book, chapter]);

  const onBookmarkPress = async function() {
    try {
      const bookmarkKey = makeBookmarkKey(book, chapter);
      let bookmarks = await Storage.getItem(storageKeys.BOOKMARKS);
      bookmarks = bookmarks ? bookmarks : {};
      const newBookmarks = bookmarked ? omit(bookmarks, [bookmarkKey]) : {...bookmarks, [bookmarkKey]: {book, chapter, totalChapters, date: new Date().toISOString()}};
      await Storage.setItem(storageKeys.BOOKMARKS, newBookmarks);
      setBookmarked(!bookmarked);
    } catch(err) {
      handleError(err);
    }
  };

  const paragraphStyle = {
    fontSize,
    lineHeight,
    fontFamily: fontFamily[fontType]
  };

  return (
    <>
      <Header navigation={navigation} rightButtonIconStyle={bookmarked ? styles.bookmarked : {}} rightButtonIcon={'bookmark'} onRightButtonPress={onBookmarkPress} showMenuButton={true}>{`${book} ${chapter}`}</Header>
      <Container style={styles.container}>
        <Content style={styles.content} endFillColor={'#000'}>
          <View>
            <Text selectable={true} style={[styles.paragraph, paragraphStyle]}>
              {paragraphs
                .map(p => {
                  return p
                    .map(([c, v, t]) => (!hideVerseNumbers ? `${c}:${v} ` : '') + entities.decode(t).trim())
                    .join(' ')
                    .trim();
                })
                .map(prepText(paragraphStyle))
              }
            </Text>
          </View>
          {paragraphs.length > 0 ?
            <View style={styles.btnContainer}>
              {chapter > 1 ? <Button style={styles.navButton} onPress={() => navigation.push(routes.BIBLE_BOOK_CHAPTER, {book, totalChapters, chapter: chapter - 1})}>{'< Prev'}</Button> : <View style={styles.navButton} />}
              <Button style={styles.bibleButton} onPress={() => navigation.push(routes.BIBLE)} icon={'book'} />
              {chapter < totalChapters ? <Button style={styles.navButton} onPress={() => navigation.push(routes.BIBLE_BOOK_CHAPTER, {book, totalChapters, chapter: chapter + 1})}>{'Next >'}</Button> : <View style={styles.navButton} />}
            </View>
            :
            null
          }
        </Content>
      </Container>
    </>
  );
};
BibleBookChapter.propTypes = {
  fontSize: PropTypes.number,
  lineHeight: PropTypes.number,
  fontType: PropTypes.string,
  hideVerseNumbers: PropTypes.bool,
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1
  },
  container: {
    paddingTop: 0,
    paddingBottom: 0
  },
  content: {
    padding: 10
  },
  paragraph: {
    paddingBottom: 10
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15
  },
  navButton: {
    flex: 1
  },
  bibleButton: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10
  },
  bookmarked: {
    color: '#2bbbfa'
  }
});

export default BibleBookChapter;
