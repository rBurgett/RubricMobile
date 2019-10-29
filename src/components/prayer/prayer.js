import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Content, Title, Text } from 'native-base';
import Button from '../shared/button';
import Container from '../shared/container';
import Header from '../shared/header';
import {colors, prayers} from '../../constants';

const Prayer = ({ morningPrayer, noonPrayer, earlyEveningPrayer, closeOfDayPrayer, navigation }) => {

  const { prayer } = navigation.state.params;
  let prayerText = '';
  switch(prayer) {
    case prayers.MORNING_PRAYER:
      prayerText = morningPrayer;
      break;
    case prayers.NOON_PRAYER:
      prayerText = noonPrayer;
      break;
    case prayers.EARLY_EVENING_PRAYER:
      prayerText = earlyEveningPrayer;
      break;
    case prayers.CLOSE_OF_DAY_PRAYER:
      prayerText = closeOfDayPrayer;
      break;
  }

  const onDone = () => {
    navigation.goBack();
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
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  content: {
    padding: 10
  },
  prayerText: {
    fontFamily: 'DroidSerif',
    fontSize: 20,
    lineHeight: 40,
    textAlign: 'center',
    marginBottom: 15
  }
});

export default Prayer;
