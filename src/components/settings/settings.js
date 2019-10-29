import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Button as NBButton, Content, Text } from 'native-base';
import Container from '../shared/container';
import { colors } from '../../constants';
import Icon from '../shared/icon';
import Header from '../shared/header';

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
    header: <Header navigation={navigation}>Settings</Header>
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
