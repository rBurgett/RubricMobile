import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar, StyleSheet } from 'react-native';
import { Body, Header, Left, Button as NBButton, Title, Content, Text } from 'native-base';
import Container from '../shared/container';
import { colors } from '../../constants';
import Icon from '../shared/icon';

const ButtonInput = ({ value = false, label, onChange }) => {
  return (
    <NBButton style={styles.button} transparent iconLeft onPress={() => onChange(!value)} allowLower>
      <Icon style={styles.buttonText}>{value ? 'radio-button-on' : 'radio-button-off'}</Icon>
      <Text style={styles.buttonText} uppercase={false}>{label}</Text>
    </NBButton>
  );
};
ButtonInput.propTypes = {
  value: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func
};

const Settings = ({ hideMorningPrayer, hideDailyReading, hideNoonPrayer, hideEarlyEveningPrayer, hideCloseOfDayPrayer, setHideMorningPrayer, setHideDailyReading, setHideNoonPrayer, setHideEarlyEveningPrayer, setHideCloseOfDayPrayer }) => {
  return (
    <Container>
      <Content style={styles.content}>
        <ButtonInput label={'Show Morning Prayer'} value={!hideMorningPrayer} onChange={show => setHideMorningPrayer(!show)} />
        <ButtonInput label={'Show Daily Reading'} value={!hideDailyReading} onChange={show => setHideDailyReading(!show)} />
        <ButtonInput label={'Show Noon Prayer'} value={!hideNoonPrayer} onChange={show => setHideNoonPrayer(!show)} />
        <ButtonInput label={'Show Early Evening Prayer'} value={!hideEarlyEveningPrayer} onChange={show => setHideEarlyEveningPrayer(!show)} />
        <ButtonInput label={'Show Close of Day Prayer'} value={!hideCloseOfDayPrayer} onChange={show => setHideCloseOfDayPrayer(!show)} />
      </Content>
    </Container>
  );
};
Settings.navigationOptions = ({ navigation } ) => {
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
          <Title>Settings</Title>
        </Body>
      </Header>
    )
  });
};
Settings.propTypes = {
  hideMorningPrayer: PropTypes.bool,
  hideDailyReading: PropTypes.bool,
  hideNoonPrayer: PropTypes.bool,
  hideEarlyEveningPrayer: PropTypes.bool,
  hideCloseOfDayPrayer: PropTypes.bool,
  setHideMorningPrayer: PropTypes.func,
  setHideDailyReading: PropTypes.func,
  setHideNoonPrayer: PropTypes.func,
  setHideEarlyEveningPrayer: PropTypes.func,
  setHideCloseOfDayPrayer: PropTypes.func
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.BROWN
  },
  content: {
    padding: 10
  },
  button: {
    marginBottom: 10
  },
  buttonText: {
    color: colors.BROWN
  }
});

export default Settings;
