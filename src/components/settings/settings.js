import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Button as NBButton, Content, Text, Item, Form, Picker, Label } from 'native-base';
import Container from '../shared/container';
import {colors, BASE_FONT_SIZE, fontTypes} from '../../constants';
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

const Settings = ({ fontSize, lineHeight, fontType, hideMorningPrayer, hideDailyReading, hideNoonPrayer, hideEarlyEveningPrayer, hideCloseOfDayPrayer, setHideMorningPrayer, setHideDailyReading, setHideNoonPrayer, setHideEarlyEveningPrayer, setHideCloseOfDayPrayer, setFontSize, setLineHeight, setFontType }) => {
  return (
    <Container>
      <Content style={styles.content}>
        <Form>
          <Item fixedLabel style={styles.pickerItem} picker>
            <Label>Reading Text Size</Label>
            <Picker selectedValue={fontSize} onValueChange={setFontSize}>
              <Picker.Item label={'1.0'} value={1 * BASE_FONT_SIZE} />
              <Picker.Item label={'1.2'} value={1.2 * BASE_FONT_SIZE} />
              <Picker.Item label={'1.4'} value={1.4 * BASE_FONT_SIZE} />
              <Picker.Item label={'1.6'} value={1.6 * BASE_FONT_SIZE} />
              <Picker.Item label={'1.8'} value={1.8 * BASE_FONT_SIZE} />
              <Picker.Item label={'2.0'} value={2 * BASE_FONT_SIZE} />
            </Picker>
          </Item>
          <Item fixedLabel style={styles.pickerItem} picker>
            <Label>Reading Line Height</Label>
            <Picker selectedValue={lineHeight} onValueChange={setLineHeight}>
              <Picker.Item label={'1'} value={1} />
              <Picker.Item label={'1.25'} value={1.25} />
              <Picker.Item label={'1.5'} value={1.5} />
              <Picker.Item label={'1.75'} value={1.75} />
              <Picker.Item label={'2'} value={2} />
            </Picker>
          </Item>
          <Item fixedLabel style={styles.pickerItem} picker>
            <Label>Reading Font Type</Label>
            <Picker selectedValue={fontType} onValueChange={setFontType}>
              <Picker.Item label={'Serif'} value={fontTypes.SERIF} />
              <Picker.Item label={'Sans-serif'} value={fontTypes.SANS_SERIF} />
            </Picker>
          </Item>
        </Form>
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
  fontSize: PropTypes.number,
  lineHeight: PropTypes.number,
  fontType: PropTypes.string,
  setHideMorningPrayer: PropTypes.func,
  setHideDailyReading: PropTypes.func,
  setHideNoonPrayer: PropTypes.func,
  setHideEarlyEveningPrayer: PropTypes.func,
  setHideCloseOfDayPrayer: PropTypes.func,
  setFontSize: PropTypes.func,
  setLineHeight: PropTypes.func,
  setFontType: PropTypes.func
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
    color: '#000'
    // color: colors.BROWN
  },
  pickerItem: {
    marginBottom: 10
  }
});

export default Settings;
