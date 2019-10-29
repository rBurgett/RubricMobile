import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Title, Content, Text } from 'native-base';
import moment from 'moment';
import Container from '../shared/container';
import Header from '../shared/header';
import { colors } from '../../constants';
import Icon from '../shared/icon';
import { handleError } from '../util';

const DailyReading = () => {

  const [ text, setText ] = useState('');

  useEffect(() => {
    const date = moment();
    const day = date.format('D');
    const month = date.format('M');
    const year = date.format('YYYY');
    fetch(`http://www.esvapi.org/v2/rest/readingPlanQuery?key=TEST&reading-plan=bcp&date=${year}-${month}-${day}&include-footnotes=false&include-audio-link=true&audio-format=mp3&output-format=plain-text`)
      .then(res => res.text())
      .then(res => setText(res))
      .catch(handleError);
  }, []);

  return (
    <Container>
      <Content style={styles.content}>
        <Text>{text}</Text>
      </Content>
    </Container>
  );
};
DailyReading.navigationOptions = ({ navigation } ) => {
  return ({
    header: (
      <Header navigation={navigation}>
        <Title style={{color: colors.TAN}}>Daily Reading</Title>
        </Header>
    )
  });
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.BROWN
  },
  content: {
    padding: 10
  }
});

export default DailyReading;
