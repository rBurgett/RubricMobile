import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { Content, Grid, Col, Row } from 'native-base';
import { StyleSheet, Alert } from 'react-native';
import moment from 'moment';
import Container from '../shared/container';
import Header from '../shared/header';
import {colors, fontFamily as fontFamilyConstants, routes, storageKeys} from '../../constants';
import Storage from '../../modules/storage';
import {handleError, makeBookmarkKey} from '../util';
import Button from '../shared/button';
import Text from '../shared/text';

const Bookmarks = ({ fontType, navigation }) => {

  const fontFamily = fontFamilyConstants[fontType];

  const [ bookmarks, setBookmarks ] = useState({});

  useEffect(() => {
    let dismounted = false;
    Storage.getItem(storageKeys.BOOKMARKS)
      .then(bm => {
        if(dismounted) return;
        setBookmarks(bm || {});
      })
      .catch(handleError);
    return () => {
      dismounted = true;
    };
  });

  const keys = Object.keys(bookmarks);

  return (
    <>
      <Header navigation={navigation} showMenuButton={true}>Bookmarks</Header>
      <Container style={styles.container}>
        <Grid>
          <Col>
            <Row>
              <Content style={styles.content}>
                {keys.length === 0 ? <Text>There are no bookmarks.</Text> : null}
                {keys
                  .sort((keyA, keyB) => {
                    const { date: dateA } = bookmarks[keyA];
                    const { date: dateB } = bookmarks[keyB];
                    return dateB.localeCompare(dateA);
                  })
                  .map(key => {
                    const { book, chapter, totalChapters, date } = bookmarks[key];
                    const dateStr = moment(date).format('YYYY-MM-DD');
                    const dateAccessibilityStr = moment(date).format('MMMM Do YYYY');

                    const name = `${book} ${chapter}`;

                    const onLongPress = () => {
                      Alert.alert(
                        'Delete Bookmark',
                        `Are you sure that you want to delete the bookmark for ${name}?`,
                        [
                          {
                            text: 'Delete',
                            onPress: async function() {
                              try {
                                const bookmarkKey = makeBookmarkKey(book, chapter);
                                const newBookmarks = omit(bookmarks, [bookmarkKey]);
                                await Storage.setItem(storageKeys.BOOKMARKS, newBookmarks);
                                setBookmarks(newBookmarks);
                              } catch(err) {
                                handleError(err);
                              }
                            },
                            style: 'destructive'
                          },
                          {text: 'Cancel', style: 'cancel'}
                        ],
                        {cancellable: true}
                      );
                    };

                    return (
                      <Button
                        accessibilityLabel={`${name}, added on ${dateAccessibilityStr}`}
                        accessibilityHint={`Navigates to ${name}`}
                        key={key} style={styles.button} onLongPress={onLongPress} onPress={() => navigation.push(routes.BIBLE_BOOK_CHAPTER, {book, totalChapters, chapter})}><Text style={[styles.buttonText, {fontFamily}]}>{name}</Text><Text style={[styles.buttonText, {fontFamily}]}>{dateStr}</Text></Button>
                    );
                  })
                }
              </Content>
            </Row>
          </Col>
        </Grid>
      </Container>
    </>
  );
};
Bookmarks.propTypes = {
  fontType: PropTypes.string,
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 5,
    paddingRight:5
  },
  content: {
    paddingTop: 10,
    paddingBottom: 10
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonText: {
    fontSize: 20,
    paddingLeft: 15,
    paddingRight: 15
  }
});

export default Bookmarks;
