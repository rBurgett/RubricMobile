import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, StatusBar } from 'react-native';
import { Body, Header, Left, Content, Title, Text, Button as NBButton } from 'native-base';
import Icon from '../shared/icon';
import Button from '../shared/button';
import Container from '../shared/container';
import { colors, prayers } from '../../constants';

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
    header: (
      <Header style={styles.header}>
        <StatusBar backgroundColor={colors.BROWN} barStyle="light-content" />
        <Left>
          <NBButton transparent onPress={() => navigation.pop()}>
            <Icon>arrow-back</Icon>
          </NBButton>
        </Left>
        <Body>
          <Title>{title}</Title>
        </Body>
      </Header>
    )
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
  header: {
    backgroundColor: colors.BROWN
  },
  content: {
    padding: 10
  },
  prayerText: {
    fontFamily: 'serif',
    fontSize: 20,
    lineHeight: 40,
    textAlign: 'center',
    marginBottom: 15
  }
});

export default Prayer;
