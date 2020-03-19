import React from 'react';
import PropTypes from 'prop-types';
import { Content, Grid, Col, Row } from 'native-base';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Container from '../shared/container';
import Header from '../shared/header';
import { ntBooks, otBooks } from '../../modules/bible';
import { fontFamily as fontFamilyConstants, routes } from '../../constants';
import Text from '../shared/text';
import H3 from '../shared/h3';

const Button = ({ children, fontFamily, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}><Text style={[styles.buttonText, {fontFamily}]}>{children}</Text></TouchableOpacity>
  );
};
Button.propTypes = {
  children: PropTypes.any,
  fontFamily: PropTypes.string,
  onPress: PropTypes.func
};

const Bible = ({ navigation, fontType }) => {

  const fontFamily = fontFamilyConstants[fontType];

  return (
    <>
      <Header navigation={navigation} showMenuButton={true} rightButtonIcon={'bookmarks'} onRightButtonPress={() => navigation.push(routes.BOOKMARKS)}>Bible</Header>
      <Container style={styles.container}>
        <Grid>
          <Col>
            <Row size={-1} style={styles.headingRow}>
              <H3 style={[styles.heading, {fontFamily}]}>Old Testament</H3>
            </Row>
            <Row>
              <Content style={styles.content}>
                {otBooks.map(book => {
                  return (
                    <Button fontFamily={fontFamily} key={book} onPress={() => navigation.push(routes.BIBLE_BOOK, { book })}>{book}</Button>
                  );
                })}
              </Content>
            </Row>
          </Col>
          <Col>
            <Row size={-1} style={styles.headingRow}>
              <H3 style={[styles.heading, {fontFamily}]}>New Testament</H3>
            </Row>
            <Row>
              <Content style={styles.content}>
                {ntBooks.map(book => {
                  return (
                    <Button fontFamily={fontFamily} key={book} onPress={() => navigation.push(routes.BIBLE_BOOK, { book })}>{book}</Button>
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
Bible.propTypes = {
  fontType: PropTypes.string,
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0
  },
  content: {
    paddingBottom: 5
  },
  button: {
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5
  },
  buttonText: {
    fontSize: 20
  },
  heading: {
    paddingLeft: 5,
    paddingRight: 5,
    fontWeight: 'bold'
  },
  headingRow: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#000'
  }
});

export default Bible;
