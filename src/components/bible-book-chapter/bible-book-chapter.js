import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Content } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import Entities from 'html-entities';
import Container from '../shared/container';
import Header from '../shared/header';
import { fontFamily, routes } from '../../constants';
import Button from '../shared/button';
import { getChapterText } from '../../util';

const entities = new Entities.AllHtmlEntities();

const BibleBookChapter = ({ navigation, fontSize, lineHeight, fontType }) => {

  lineHeight = lineHeight * fontSize;

  const { book, chapter, totalChapters } = navigation.state.params;

  const [paragraphs, setParagraphs] = useState([]);

  useEffect(() => {
    setParagraphs(getChapterText(book, chapter));
  }, [book, chapter]);

  return (
    <Container style={styles.container}>
      <Content style={styles.content} endFillColor={'#000'}>
        <View>
          <Text selectable={true} style={[styles.paragraph, { fontSize, lineHeight, fontFamily: fontFamily[fontType] }]}>
            {paragraphs
              .map(p => {
                return p
                  .map(([c, v, t]) => `${c}:${v} ${entities.decode(t).trim()}`)
                  .join(' ')
                  .trim();
              })
              .join('\n\n')
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
  );
};
BibleBookChapter.navigationOptions = ({ navigation } ) => {
  const { book, chapter } = navigation.state.params;
  return ({
    header: <Header navigation={navigation} showMenuButton={true}>{`${book} ${chapter}`}</Header>
  });
};
BibleBookChapter.propTypes = {
  fontSize: PropTypes.number,
  lineHeight: PropTypes.number,
  fontType: PropTypes.string,
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
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
  }
});

export default BibleBookChapter;
