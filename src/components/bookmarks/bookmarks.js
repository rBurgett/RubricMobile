import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Content, Grid, Col, Row } from 'native-base';
import { StyleSheet, Text } from 'react-native';
import moment from 'moment';
import Container from '../shared/container';
import Header from '../shared/header';
import {colors, fontFamily as fontFamilyConstants, routes, storageKeys} from '../../constants';
import Storage from '../../modules/storage';
import {handleError} from '../util';
import Button from '../shared/button';

const Bookmarks = ({ fontType, navigation }) => {

  const fontFamily = fontFamilyConstants[fontType];

  const [ bookmarks, setBookmarks ] = useState({});

  useEffect(() => {
    Storage.getItem(storageKeys.BOOKMARKS)
      .then(bm => {
        setBookmarks(bm || {});
      })
      .catch(handleError);
  });

  return (
    <Container style={styles.container}>
      <Grid>
        <Col>
          <Row>
            <Content style={styles.content}>
              {Object.keys(bookmarks)
                .sort((keyA, keyB) => {
                  const { date: dateA } = bookmarks[keyA];
                  const { date: dateB } = bookmarks[keyB];
                  return dateB.localeCompare(dateA);
                })
                .map(key => {
                  const { book, chapter, totalChapters, date } = bookmarks[key];
                  const dateStr = moment(date).format('YYYY-MM-DD');
                  return (
                    <Button key={key} style={styles.button} onPress={() => navigation.push(routes.BIBLE_BOOK_CHAPTER, {book, totalChapters, chapter})}><Text style={[styles.buttonText, {fontFamily}]}>{book} {chapter}</Text><Text style={[styles.buttonText, {fontFamily}]}>{dateStr}</Text></Button>
                  );
                })
              }
            </Content>
          </Row>
        </Col>
      </Grid>
    </Container>
  );
};
Bookmarks.navigationOptions = ({ navigation } ) => {
  return ({
    header: <Header navigation={navigation} showMenuButton={true}>Bookmarks</Header>
  });
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
    color: colors.BROWN,
    fontSize: 20,
    paddingLeft: 15,
    paddingRight: 15
  }
});

export default Bookmarks;
