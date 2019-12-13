import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Content } from 'native-base';
import Button from '../shared/button';
import Container from '../shared/container';
import Header from '../shared/header';
import { prayers, fontFamily } from '../../constants';
import Progress from '../../types/progress';
import Storage from '../../modules/storage';
import { handleError } from '../util';
import Text from '../shared/text';

const Prayer = ({ progress, morningPrayer, noonPrayer, earlyEveningPrayer, closeOfDayPrayer, fontType, navigation, setProgress }) => {

  const { prayer } = navigation.state.params;
  let prayerText = '';
  let progressKey = '';
  let title = '';
  switch(prayer) {
    case prayers.MORNING_PRAYER:
      prayerText = morningPrayer;
      progressKey = 'mp';
      title = 'Morning Prayer';
      break;
    case prayers.NOON_PRAYER:
      prayerText = noonPrayer;
      progressKey = 'np';
      title = 'Noon Prayer';
      break;
    case prayers.EARLY_EVENING_PRAYER:
      prayerText = earlyEveningPrayer;
      progressKey = 'ee';
      title = 'Early Evening Prayer';
      break;
    case prayers.CLOSE_OF_DAY_PRAYER:
      prayerText = closeOfDayPrayer;
      progressKey = 'eod';
      title = 'Close of Day Prayer';
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
    <>
      <Header navigation={navigation}>{title}</Header>
      <Container>
        <Content style={styles.content}>
          <Text style={[styles.prayerText, {fontFamily: fontFamily[fontType]}]}>{prayerText}</Text>
          <Button onPress={onDone} icon={'checkmark'}>Amen</Button>
        </Content>
      </Container>
    </>
  );
};
Prayer.propTypes = {
  morningPrayer: PropTypes.string,
  noonPrayer: PropTypes.string,
  earlyEveningPrayer: PropTypes.string,
  closeOfDayPrayer: PropTypes.string,
  navigation: PropTypes.object,
  progress: PropTypes.instanceOf(Progress),
  fontType: PropTypes.string,
  setProgress: PropTypes.func
};

const styles = StyleSheet.create({
  content: {
    padding: 10
  },
  prayerText: {
    fontSize: 20,
    lineHeight: 40,
    textAlign: 'center',
    marginBottom: 15
  }
});

export default Prayer;
