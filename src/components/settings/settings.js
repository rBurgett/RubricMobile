import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StatusBar, StyleSheet } from 'react-native';
import { Body, Header, Left, Button as NBButton, Title, Content, Text } from 'native-base';
import Container from '../shared/container';
import { colors } from '../../constants';
import Icon from '../shared/icon';

const ButtonInput = ({ value, label, onChange }) => {
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

const Settings = () => {

  const [ showMorningPrayer, setShowMorningPrayer ] = useState(true);
  const [ showDailyReading, setShowDailyReading ] = useState(true);
  const [ showNoonPrayer, setShowNoonPrayer ] = useState(true);
  const [ showEarlyEveningPrayer, setShowEarlyEveningPrayer ] = useState(true);
  const [ showCloseOfDayPrayer, setShowCloseOfDayPrayer ] = useState(true);

  return (
    <Container>
      <Content style={styles.content}>
        <ButtonInput label={'Show Morning Prayer'} value={showMorningPrayer} onChange={setShowMorningPrayer} />
        <ButtonInput label={'Show Daily Reading'} value={showDailyReading} onChange={setShowDailyReading} />
        <ButtonInput label={'Show Noon Prayer'} value={showNoonPrayer} onChange={setShowNoonPrayer} />
        <ButtonInput label={'Show Early Evening Prayer'} value={showEarlyEveningPrayer} onChange={setShowEarlyEveningPrayer} />
        <ButtonInput label={'Show Close of Day Prayer'} value={showCloseOfDayPrayer} onChange={setShowCloseOfDayPrayer} />
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
