import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Button as NBButton, Content, Text, Item, Form, Picker as NBPicker, Label as NBLabel } from 'native-base';
import RNRestart from 'react-native-restart';
import omit from 'lodash/omit';
import Container from '../shared/container';
import { colors, BASE_FONT_SIZE, fontTypes, notificationIds } from '../../constants';
import Icon from '../shared/icon';
import Header from '../shared/header';
import Platform from '../../modules/platform';
import { scheduleLocalNotification } from '../../modules/notifications';

let Picker = (props) => {
  const { style = {} } = props;
  const newProps = {
    style,
    ...omit(props, ['children', 'style'])
  };
  return <NBPicker {...newProps}>{props.children}</NBPicker>;
};
Picker.Item = NBPicker.Item;
Picker.propTypes = {
  darkMode: PropTypes.bool,
  style: PropTypes.any,
  children: PropTypes.any
};
Picker = connect(
  ({ appState }) => ({
    darkMode: appState.darkMode
  })
)(Picker);

let ButtonInput = ({ darkMode, value = false, label, onChange }) => {

  const textStyle = {
    color: darkMode ? colors.PRIMARY_TEXT_DM : colors.TEXT
  };

  return (
    <NBButton style={styles.button} transparent iconLeft onPress={() => onChange(!value)} allowLower>
      <Icon style={textStyle}>{value ? 'md-checkbox-outline' : 'square-outline'}</Icon>
      <Text style={textStyle} uppercase={false}>{label}</Text>
    </NBButton>
  );
};
ButtonInput.propTypes = {
  darkMode: PropTypes.bool,
  value: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func
};
ButtonInput = connect(
  ({ appState }) => ({
    darkMode: appState.darkMode
  })
)(ButtonInput);

const HourPicker = ({ value, label, onChange, darkMode }) => {
  return (
    <Item fixedLabel style={[styles.pickerItem, styles.hourPickerContainer]} picker>
      <Label>{label}</Label>
      <Picker textStyle={darkMode ? {color: colors.PRIMARY_TEXT_DM} : {color: colors.TEXT}} selectedValue={value} onValueChange={onChange}>
        <Picker.Item label={'none'} value={-1} />
        <Picker.Item label={'12 am'} value={0} />
        <Picker.Item label={'1 am'} value={1} />
        <Picker.Item label={'2 am'} value={2} />
        <Picker.Item label={'3 am'} value={3} />
        <Picker.Item label={'4 am'} value={4} />
        <Picker.Item label={'5 am'} value={5} />
        <Picker.Item label={'6 am'} value={6} />
        <Picker.Item label={'7 am'} value={7} />
        <Picker.Item label={'8 am'} value={8} />
        <Picker.Item label={'9 am'} value={9} />
        <Picker.Item label={'10 am'} value={10} />
        <Picker.Item label={'11 am'} value={11} />
        <Picker.Item label={'12 pm'} value={12} />
        <Picker.Item label={'1 pm'} value={13} />
        <Picker.Item label={'2 pm'} value={14} />
        <Picker.Item label={'3 pm'} value={15} />
        <Picker.Item label={'4 pm'} value={16} />
        <Picker.Item label={'5 pm'} value={17} />
        <Picker.Item label={'6 pm'} value={18} />
        <Picker.Item label={'7 pm'} value={19} />
        <Picker.Item label={'8 pm'} value={20} />
        <Picker.Item label={'9 pm'} value={21} />
        <Picker.Item label={'10 pm'} value={22} />
        <Picker.Item label={'11 pm'} value={23} />
      </Picker>
    </Item>
  );
};
HourPicker.propTypes = {
  darkMode: PropTypes.bool,
  value: PropTypes.number,
  label: PropTypes.string,
  onChange: PropTypes.func
};

let Label = ({ darkMode, children, style = {} }) => {
  const allStyles = {
    color: darkMode ? colors.PRIMARY_TEXT_DM : colors.TEXT,
    ...style
  };
  return <NBLabel style={allStyles}>{children}</NBLabel>;
};
Label.propTypes = {
  darkMode: PropTypes.bool,
  children: PropTypes.string,
  style: PropTypes.any
};
Label = connect(
  ({ appState }) => ({
    darkMode: appState.darkMode
  })
)(Label);

const Settings = ({ navigation, fontSize, lineHeight, fontType, hideVerseNumbers, hideMorningPrayer, hideDailyReading, hideNoonPrayer, hideEarlyEveningPrayer, hideCloseOfDayPrayer, morningPrayerTime, dailyReadingTime, noonPrayerTime, earlyEveningPrayerTime, closeOfDayPrayerTime, darkMode,  setHideMorningPrayer, setHideDailyReading, setHideNoonPrayer, setHideEarlyEveningPrayer, setHideCloseOfDayPrayer, setFontSize, setLineHeight, setFontType, setHideVerseNumbers, setMorningPrayerTime, setDailyReadingTime, setNoonPrayerTime, setEarlyEveningPrayerTime, setCloseOfDayPrayerTime, setDarkMode }) => {

  const onTimeChange = (id, val) => {

    scheduleLocalNotification(id, val);

    switch(id) {
      case notificationIds.MORNING_PRAYER:
        setMorningPrayerTime(val);
        break;
      case notificationIds.DAILY_READING:
        setDailyReadingTime(val);
        break;
      case notificationIds.NOON_PRAYER:
        setNoonPrayerTime(val);
        break;
      case notificationIds.EARLY_EVENING_PRAYER:
        setEarlyEveningPrayerTime(val);
        break;
      case notificationIds.CLOSE_OF_DAY_PRAYER:
        setCloseOfDayPrayerTime(val);
        break;
    }
  };

  const color = darkMode ? colors.PRIMARY_TEXT_DM : colors.TEXT;

  const onDarkModeChange = val => {
    if(Platform.isAndroid()) {
      Alert.alert(
        'Restart Required',
        'Changing color mode requires an app restart. Do you want to continue?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => {}
          },
          {
            text: 'OK',
            onPress: async function() {
              await setDarkMode(val, true);
              RNRestart.Restart();
            }
          }
        ]
      );
    } else {
      setDarkMode(val);
    }
  };

  return (
    <>
      <Header navigation={navigation}>Settings</Header>
      <Container style={styles.container}>
        <Content style={styles.content}>
          <Form>
            <Item fixedLabel style={styles.pickerItem} picker>
              <Label style={{color}}>Reading Text Size</Label>
              <Picker textStyle={darkMode ? {color: colors.PRIMARY_TEXT_DM} : {color: colors.TEXT}} mode={'dialog'} selectedValue={fontSize} onValueChange={setFontSize}>
                <Picker.Item label={'1.0'} value={BASE_FONT_SIZE} />
                <Picker.Item label={'1.2'} value={1.2 * BASE_FONT_SIZE} />
                <Picker.Item label={'1.4'} value={1.4 * BASE_FONT_SIZE} />
                <Picker.Item label={'1.6'} value={1.6 * BASE_FONT_SIZE} />
                <Picker.Item label={'1.8'} value={1.8 * BASE_FONT_SIZE} />
                <Picker.Item label={'2.0'} value={2 * BASE_FONT_SIZE} />
              </Picker>
            </Item>
            <Item fixedLabel style={styles.pickerItem} picker>
              <Label>Reading Line Height</Label>
              <Picker textStyle={darkMode ? {color: colors.PRIMARY_TEXT_DM} : {color: colors.TEXT}} selectedValue={lineHeight} onValueChange={setLineHeight}>
                <Picker.Item label={'1'} value={1} />
                <Picker.Item label={'1.25'} value={1.25} />
                <Picker.Item label={'1.5'} value={1.5} />
                <Picker.Item label={'1.75'} value={1.75} />
                <Picker.Item label={'2'} value={2} />
              </Picker>
            </Item>
            <Item fixedLabel style={styles.pickerItem} picker>
              <Label>Reading Font Type</Label>
              <Picker textStyle={darkMode ? {color: colors.PRIMARY_TEXT_DM} : {color: colors.TEXT}} selectedValue={fontType} onValueChange={setFontType}>
                <Picker.Item label={'Serif'} value={fontTypes.SERIF} />
                <Picker.Item label={'Sans-serif'} value={fontTypes.SANS_SERIF} />
              </Picker>
            </Item>
            <Item fixedLabel style={styles.pickerItem} picker>
              <Label>Verse Numbers</Label>
              <Picker textStyle={darkMode ? {color: colors.PRIMARY_TEXT_DM} : {color: colors.TEXT}} selectedValue={hideVerseNumbers} onValueChange={setHideVerseNumbers}>
                <Picker.Item label={'Show'} value={false} />
                <Picker.Item label={'Hide'} value={true} />
              </Picker>
            </Item>
            <Item fixedLabel style={styles.pickerItem} picker>
              <Label>Dark Mode</Label>
              <Picker textStyle={darkMode ? {color: colors.PRIMARY_TEXT_DM} : {color: colors.TEXT}} selectedValue={darkMode} onValueChange={val => onDarkModeChange(val)}>
                <Picker.Item label={'On'} value={true} />
                <Picker.Item label={'Off'} value={false} />
              </Picker>
            </Item>

            <ButtonInput
              label={'Show Morning Prayer'}
              value={!hideMorningPrayer}
              onChange={show => {
                if(!show) scheduleLocalNotification(notificationIds.MORNING_PRAYER, -1);
                setHideMorningPrayer(!show);
              }} />
            {!hideMorningPrayer ? <HourPicker darkMode={darkMode} label={'Notification Time'} value={morningPrayerTime} onChange={val => onTimeChange(notificationIds.MORNING_PRAYER, val)} /> : null}

            <ButtonInput
              label={'Show Daily Reading'}
              value={!hideDailyReading}
              onChange={show => {
                if(!show) scheduleLocalNotification(notificationIds.DAILY_READING, -1);
                setHideDailyReading(!show);
              }} />
            {!hideDailyReading ? <HourPicker darkMode={darkMode} label={'Notification Time'} value={dailyReadingTime} onChange={val => onTimeChange(notificationIds.DAILY_READING, val)} /> : null}

            <ButtonInput
              label={'Show Noon Prayer'}
              value={!hideNoonPrayer}
              onChange={show => {
                if(!show) scheduleLocalNotification(notificationIds.NOON_PRAYER, -1);
                setHideNoonPrayer(!show);
              }} />
            {!hideNoonPrayer ? <HourPicker darkMode={darkMode} label={'Notification Time'} value={noonPrayerTime} onChange={val => onTimeChange(notificationIds.NOON_PRAYER, val)} /> : null}

            <ButtonInput
              label={'Show Early Evening Prayer'}
              value={!hideEarlyEveningPrayer}
              onChange={show => {
                if(!show) scheduleLocalNotification(notificationIds.EARLY_EVENING_PRAYER, -1);
                setHideEarlyEveningPrayer(!show);
              }} />
            {!hideEarlyEveningPrayer ? <HourPicker darkMode={darkMode} label={'Notification Time'} value={earlyEveningPrayerTime} onChange={val => onTimeChange(notificationIds.EARLY_EVENING_PRAYER, val)} /> : null}

            <ButtonInput
              label={'Show Close of Day Prayer'}
              value={!hideCloseOfDayPrayer}
              onChange={show => {
                if(!show) scheduleLocalNotification(notificationIds.CLOSE_OF_DAY_PRAYER, -1);
                setHideCloseOfDayPrayer(!show);
              }} />
            {!hideCloseOfDayPrayer ? <HourPicker darkMode={darkMode} label={'Notification Time'} value={closeOfDayPrayerTime} onChange={val => onTimeChange(notificationIds.CLOSE_OF_DAY_PRAYER, val)} /> : null}

          </Form>
        </Content>
      </Container>
    </>
  );
};
Settings.propTypes = {
  navigation: PropTypes.object,
  hideMorningPrayer: PropTypes.bool,
  hideDailyReading: PropTypes.bool,
  hideNoonPrayer: PropTypes.bool,
  hideEarlyEveningPrayer: PropTypes.bool,
  hideCloseOfDayPrayer: PropTypes.bool,
  fontSize: PropTypes.number,
  lineHeight: PropTypes.number,
  fontType: PropTypes.string,
  hideVerseNumbers: PropTypes.bool,
  morningPrayerTime: PropTypes.number,
  dailyReadingTime: PropTypes.number,
  noonPrayerTime: PropTypes.number,
  earlyEveningPrayerTime: PropTypes.number,
  closeOfDayPrayerTime: PropTypes.number,
  darkMode: PropTypes.bool,
  setHideMorningPrayer: PropTypes.func,
  setHideDailyReading: PropTypes.func,
  setHideNoonPrayer: PropTypes.func,
  setHideEarlyEveningPrayer: PropTypes.func,
  setHideCloseOfDayPrayer: PropTypes.func,
  setFontSize: PropTypes.func,
  setLineHeight: PropTypes.func,
  setFontType: PropTypes.func,
  setHideVerseNumbers: PropTypes.func,
  setMorningPrayerTime: PropTypes.func,
  setDailyReadingTime: PropTypes.func,
  setNoonPrayerTime: PropTypes.func,
  setEarlyEveningPrayerTime: PropTypes.func,
  setCloseOfDayPrayerTime: PropTypes.func,
  setDarkMode: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingBottom: 0
  },
  content: {
    padding: 10
  },
  button: {
    marginBottom: 10
  },
  pickerItem: {
    marginBottom: 10
  },
  hourPickerContainer: {
    marginLeft: 15
  }
});

export default Settings;
