import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Content, Text, H2 } from 'native-base';
import moment from 'moment';
import Container from '../shared/container';
import Header from '../shared/header';
import { colors } from '../../constants';
import { handleError } from '../util';
import dailyReadingData from '../../../daily-readings';
import Entities from 'html-entities';
import { getPassageText } from '../../util';

const entities = new Entities.AllHtmlEntities();

const DailyReading = ({ fontSize, lineHeight }) => {

  lineHeight = lineHeight === 1 ? fontSize + 1 : fontSize * lineHeight;

  const [ textSections, setTextSections ] = useState([]);

  useEffect(() => {
    try {
      const date = moment();
      const day = date.format('D');
      const month = date.format('M');
      const year = date.format('YYYY');
      const passages = dailyReadingData[`${year}-${month}-${day}`];
      const text = [];
      for(const passage of passages) {
        text.push([passage, getPassageText(passage)]);
      }
      setTextSections(text);
    } catch(err) {
      handleError(err);
    }
  }, []);

  return (
    <Container style={styles.container}>
      <Content style={styles.content}>
        {textSections.map(([range, paragraphs]) => {
          return (
            <View key={range}>
              <H2 style={styles.heading}>{range}</H2>
              <Text selectable={true} style={[styles.paragraph, { fontSize, lineHeight }]}>
                {paragraphs
                  .map(p => {
                    return p
                      .map(([c, v, t]) => `${c}:${v} ${entities.decode(t).trim()}`)
                      .join(' ');
                  })
                  .join('\n\n')
                }
              </Text>
            </View>
          );
        })}
      </Content>
    </Container>
  );
};
DailyReading.navigationOptions = ({ navigation } ) => {
  return ({
    header: <Header navigation={navigation}>Daily Reading</Header>
  });
};
DailyReading.propTypes = {
  fontSize: PropTypes.number,
  lineHeight: PropTypes.number
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingBottom: 0
  },
  heading: {
    paddingBottom: 10
  },
  content: {
    padding: 10
  },
  paragraph: {
    fontFamily: 'DroidSerif',
    paddingBottom: 22
  }
});

export default DailyReading;
