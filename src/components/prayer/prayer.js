import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Content } from 'native-base';
import moment from 'moment';
import Button from '../shared/button';
import Container from '../shared/container';
import Header from '../shared/header';
import { prayers, fontFamily } from '../../constants';
import Progress from '../../types/progress';
import Storage from '../../modules/storage';
import { handleError } from '../util';
import Text from '../shared/text';
import {scheduleLocalNotification} from '../../modules/notifications';

const Prayer = ({ progress, morningPrayer, noonPrayer, earlyEveningPrayer, closeOfDayPrayer, fontType, navigation, morningPrayerTime, noonPrayerTime, earlyEveningPrayerTime, closeOfDayPrayerTime, setProgress }) => {

  const { prayer } = navigation.state.params;
  let prayerText = '';
  let progressKey = '';
  let title = '';
  let notificationTime;
  switch(prayer) {
    case prayers.MORNING_PRAYER:
      prayerText = morningPrayer;
      progressKey = 'mp';
      title = 'Morning Prayer';
      notificationTime = morningPrayerTime;
      break;
    case prayers.NOON_PRAYER:
      prayerText = noonPrayer;
      progressKey = 'np';
      title = 'Noon Prayer';
      notificationTime = noonPrayerTime;
      break;
    case prayers.EARLY_EVENING_PRAYER:
      prayerText = earlyEveningPrayer;
      progressKey = 'ee';
      title = 'Early Evening Prayer';
      notificationTime = earlyEveningPrayerTime;
      break;
    case prayers.CLOSE_OF_DAY_PRAYER:
      prayerText = closeOfDayPrayer;
      progressKey = 'eod';
      title = 'Close of Day Prayer';
      notificationTime = closeOfDayPrayerTime;
      break;
  }

  const onDone = async function() {
    try {
      const newProgress = progress.set({
        [progressKey]: true
      });
      await Storage.setItem(progress.key, newProgress);
      setProgress(newProgress);
      if(notificationTime > -1) {
        const now = moment();
        const scheduled = moment()
          .hour(notificationTime)
          .minute(0);
        if(now.isBefore(scheduled)) {
          scheduleLocalNotification(prayer, notificationTime, true);
        }
      }
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
          <Button accessibilityLabel={'Amen'} onPress={onDone} icon={'checkmark'}>Amen</Button>
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
  morningPrayerTime: PropTypes.number,
  noonPrayerTime: PropTypes.number,
  earlyEveningPrayerTime: PropTypes.number,
  closeOfDayPrayerTime: PropTypes.number,
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
