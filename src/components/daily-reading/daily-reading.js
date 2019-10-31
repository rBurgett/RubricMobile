import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Content, Text, H2 } from 'native-base';
import moment from 'moment';
import Container from '../shared/container';
import Header from '../shared/header';
import { routes, SERIF_FONT_FAMILY } from '../../constants';
import { handleError } from '../util';
import dailyReadingData from '../../../daily-readings';
import Entities from 'html-entities';
import { getPassageText } from '../../util';
import Button from '../shared/button';
import Progress from '../../types/progress';
import Storage from '../../modules/storage';

const entities = new Entities.AllHtmlEntities();

const DailyReading = ({ fontSize, lineHeight, navigation, progress, setProgress }) => {

  lineHeight = lineHeight * fontSize;

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

  const onDonePress = async function() {
    try {
      const newProgress = progress.set({
        dr: true
      });
      await Storage.setItem(progress.key, newProgress);
      setProgress(newProgress);
      navigation.goBack();
    } catch(err) {
      handleError(err);
    }
  };

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
        <View style={styles.doneBtnContainer}>
          {textSections.length > 0 ? <Button icon={'checkmark'} onPress={onDonePress}>Done</Button> : null}
        </View>
      </Content>
    </Container>
  );
};
DailyReading.navigationOptions = ({ navigation } ) => {

  const onRightButtonPress = () => {
    navigation.navigate(routes.SETTINGS);
  };

  return ({
    header: <Header navigation={navigation} rightButtonIcon={'cog'} onRightButtonPress={onRightButtonPress}>Daily Reading</Header>
  });
};
DailyReading.propTypes = {
  fontSize: PropTypes.number,
  lineHeight: PropTypes.number,
  progress: PropTypes.instanceOf(Progress),
  navigation: PropTypes.object,
  setProgress: PropTypes.func
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
    fontFamily: SERIF_FONT_FAMILY,
    paddingBottom: 22
  },
  doneBtnContainer: {
    paddingBottom: 15
  }
});

export default DailyReading;
