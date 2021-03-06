import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Content, Grid, Col, Row } from 'native-base';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Container from '../shared/container';
import Header from '../shared/header';
import { getBook } from '../../modules/bible';
import { fontFamily as fontFamilyConstants, routes } from '../../constants';
import Text from '../shared/text';

const Button = ({ fontFamily, children, onPress, accessibilityLabel = '', accessibilityHint = '' }) => {
  return (
    <TouchableOpacity
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole={'button'}
      style={styles.button} onPress={onPress}><Text style={[styles.buttonText, {fontFamily}]}>{children}</Text></TouchableOpacity>
  );
};
Button.propTypes = {
  fontFamily: PropTypes.string,
  children: PropTypes.any,
  accessibilityLabel: PropTypes.string,
  accessibilityHint: PropTypes.string,
  onPress: PropTypes.func
};

const BibleBook = ({ fontType, navigation }) => {

  const fontFamily = fontFamilyConstants[fontType];

  const { book } = navigation.state.params;

  const [ chapters, setChapters ] = useState([]);

  useEffect(() => {
    const data = getBook[book]();
    setChapters(data);
  }, [book]);

  return (
    <>
      <Header navigation={navigation} showMenuButton={true}>{book}</Header>
      <Container style={styles.container}>
        <Grid>
          <Col>
            <Row>
              <Content>
                {chapters.map((chapter, i) => {
                  const name = `Chapter ${i + 1}`;
                  return (
                    <Button
                      accessibilityLabel={name}
                      fontFamily={fontFamily} key={name} onPress={() => navigation.push(routes.BIBLE_BOOK_CHAPTER, {book, totalChapters: chapters.length, chapter: i + 1})}>{name}</Button>
                  );
                })}
              </Content>
            </Row>
          </Col>
        </Grid>
      </Container>
    </>
  );
};
BibleBook.propTypes = {
  fontType: PropTypes.string,
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0
  },
  button: {
    paddingLeft: 15,
    paddingTop: 7,
    paddingBottom: 7
  },
  buttonText: {
    fontSize: 20
  }
});

export default BibleBook;
