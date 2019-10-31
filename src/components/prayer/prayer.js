import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Content, Text } from 'native-base';
import Button from '../shared/button';
import Container from '../shared/container';
import Header from '../shared/header';
import { prayers, SERIF_FONT_FAMILY } from '../../constants';
import Progress from '../../types/progress';
import Storage from '../../modules/storage';
import { handleError } from '../util';

const Prayer = ({ progress, morningPrayer, noonPrayer, earlyEveningPrayer, closeOfDayPrayer, navigation, setProgress }) => {

  const { prayer } = navigation.state.params;
  let prayerText = '';
  let progressKey = '';
  switch(prayer) {
    case prayers.MORNING_PRAYER:
      prayerText = morningPrayer;
      progressKey = 'mp';
      break;
    case prayers.NOON_PRAYER:
      prayerText = noonPrayer;
      progressKey = 'np';
      break;
    case prayers.EARLY_EVENING_PRAYER:
      prayerText = earlyEveningPrayer;
      progressKey = 'ee';
      break;
    case prayers.CLOSE_OF_DAY_PRAYER:
      prayerText = closeOfDayPrayer;
      progressKey = 'eod';
      break;
  }

  const onDone = async function() {
    try {
      const newProgress = progress.set({
        [progressKey]: true
      });
      await Storage.setItem(progress.key, newProgress);
      setProgress(newProgress);
      navigation.goBack();
    } catch(err) {
      handleError(err);
    }
  };

  return (
    <Container>
      <Content style={styles.content}>
        <Text style={styles.prayerText}>{prayerText}</Text>
        <Button onPress={onDone} icon={'checkmark'}>Amen</Button>
      </Content>
    </Container>
  );
};
Prayer.navigationOptions = ({ navigation } ) => {

  const { prayer } = navigation.state.params;
  let title = '';
  switch(prayer) {
    case prayers.MORNING_PRAYER:
      title = 'Morning Prayer';
      break;
    case prayers.NOON_PRAYER:
      title = 'Noon Prayer';
      break;
    case prayers.EARLY_EVENING_PRAYER:
      title = 'Early Evening Prayer';
      break;
    case prayers.CLOSE_OF_DAY_PRAYER:
      title = 'Close of Day Prayer';
      break;
  }

  return ({
    header: <Header navigation={navigation}>{title}</Header>
  });

};
Prayer.propTypes = {
  morningPrayer: PropTypes.string,
  noonPrayer: PropTypes.string,
  earlyEveningPrayer: PropTypes.string,
  closeOfDayPrayer: PropTypes.string,
  navigation: PropTypes.object,
  progress: PropTypes.instanceOf(Progress),
  setProgress: PropTypes.func
};

const styles = StyleSheet.create({
  content: {
    padding: 10
  },
  prayerText: {
    fontFamily: SERIF_FONT_FAMILY,
    fontSize: 20,
    lineHeight: 40,
    textAlign: 'center',
    marginBottom: 15
  }
});

export default Prayer;
