import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList, SafeAreaView } from 'react-native';
import { Text, H2 } from 'native-base';
import moment from 'moment';
import Container from '../shared/container';
import Header from '../shared/header';
import {routes, fontFamily, colors} from '../../constants';
import { handleError } from '../util';
import dailyReadingData from '../../../daily-readings';
import Entities from 'html-entities';
import { getPassageText } from '../../util';
import Button from '../shared/button';
import Progress from '../../types/progress';
import Storage from '../../modules/storage';

const entities = new Entities.AllHtmlEntities();

const DailyReading = ({ fontSize, lineHeight, fontType, navigation, progress, setProgress }) => {

  lineHeight = lineHeight * fontSize;

  const [ textSections, setTextSections ] = useState([]);
  const [ readingProgress, setReadingProgress ] = useState(0);

  useEffect(() => {
    const date = moment();
    const day = date.format('DD');
    const month = date.format('MM');
    const year = date.format('YYYY');
    const passages = dailyReadingData[`${year}-${month}-${day}`];
    const text = [];
    for(const passage of passages) {
      text.push({id: passage, arr: [passage, getPassageText(passage)]});
    }
    setTextSections(text);
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

  const onRightButtonPress = () => {
    navigation.navigate(routes.SETTINGS);
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header navigation={navigation} rightButtonIcon={'cog'} onRightButtonPress={onRightButtonPress}>{`Reading ${readingProgress.toFixed()}%`}</Header>
      <Container style={styles.container}>
        <FlatList
          style={styles.content}
          data={textSections}
          keyExtractor={item => item.id}
          onScroll={e => {
            e.persist();
            const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;
            const height = contentSize.height - layoutMeasurement.height;
            const offset = contentOffset.y <= 0 ? 0 : contentOffset.y >= height ? height : contentOffset.y;
            setReadingProgress((offset / height) * 100);
          }}
          renderItem={({ item }) => {
            const [ range, paragraphs ] = item.arr;
            return (
              <View key={range}>
                <H2 style={[styles.heading, {fontFamily: fontFamily[fontType]}]}>{range}</H2>
                <Text selectable={true} style={[styles.paragraph, { fontSize, lineHeight, fontFamily: fontFamily[fontType] }]}>
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
          }}
          ListFooterComponent={() => {
            return (
              <View style={styles.doneBtnContainer}>
                {textSections.length > 0 ? <Button icon={'checkmark'} onPress={onDonePress}>Done</Button> : null}
              </View>
            );
          }}
        />
      </Container>
    </SafeAreaView>
  );
};
DailyReading.propTypes = {
  fontSize: PropTypes.number,
  lineHeight: PropTypes.number,
  fontType: PropTypes.string,
  progress: PropTypes.instanceOf(Progress),
  navigation: PropTypes.object,
  setProgress: PropTypes.func
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: colors.BROWN
  },
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
    paddingBottom: 22
  },
  doneBtnContainer: {
    paddingBottom: 15
  }
});

export default DailyReading;
