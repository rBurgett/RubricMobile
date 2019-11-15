import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Button as NBButton, Content, Text, Item, Form, Picker, Label } from 'native-base';
import Container from '../shared/container';
import { colors, BASE_FONT_SIZE, fontTypes, notificationIds } from '../../constants';
import Icon from '../shared/icon';
import Header from '../shared/header';
import { scheduleLocalNotification } from '../../modules/notifications';
import Platform from '../../modules/platform';

const ButtonInput = ({ value = false, label, onChange }) => {
  return (
    <NBButton style={styles.button} transparent iconLeft onPress={() => onChange(!value)} allowLower>
      <Icon style={styles.buttonText}>{value ? 'md-checkbox-outline' : 'square-outline'}</Icon>
      <Text style={styles.buttonText} uppercase={false}>{label}</Text>
    </NBButton>
  );
};
ButtonInput.propTypes = {
  value: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func
};

const HourPicker = ({ value, label, onChange }) => {
  return (
    <Item fixedLabel style={[styles.pickerItem, styles.hourPickerContainer]} picker>
      <Label>{label}</Label>
      <Picker selectedValue={value} onValueChange={onChange}>
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
  value: PropTypes.number,
  label: PropTypes.string,
  onChange: PropTypes.func
};

const Settings = ({ fontSize, lineHeight, fontType, hideVerseNumbers, hideMorningPrayer, hideDailyReading, hideNoonPrayer, hideEarlyEveningPrayer, hideCloseOfDayPrayer, morningPrayerTime, dailyReadingTime, noonPrayerTime, earlyEveningPrayerTime, closeOfDayPrayerTime, setHideMorningPrayer, setHideDailyReading, setHideNoonPrayer, setHideEarlyEveningPrayer, setHideCloseOfDayPrayer, setFontSize, setLineHeight, setFontType, setHideVerseNumbers, setMorningPrayerTime, setDailyReadingTime, setNoonPrayerTime, setEarlyEveningPrayerTime, setCloseOfDayPrayerTime }) => {

  const isAndroid = Platform.isAndroid();

  const onTimeChange = (id, val) => {

    if(isAndroid) scheduleLocalNotification(id, val);

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
          <Item fixedLabel style={styles.pickerItem} picker>
            <Label>Verse Numbers</Label>
            <Picker selectedValue={hideVerseNumbers} onValueChange={setHideVerseNumbers}>
              <Picker.Item label={'Show'} value={false} />
              <Picker.Item label={'Hide'} value={true} />
            </Picker>
          </Item>

          <ButtonInput
            label={'Show Morning Prayer'}
            value={!hideMorningPrayer}
            onChange={show => {
              if(!show) scheduleLocalNotification(notificationIds.MORNING_PRAYER, -1);
              setHideMorningPrayer(!show);
            }} />
          {!hideMorningPrayer ? <HourPicker label={'Notification Time'} value={morningPrayerTime} onChange={val => onTimeChange(notificationIds.MORNING_PRAYER, val)} /> : null}

          <ButtonInput
            label={'Show Daily Reading'}
            value={!hideDailyReading}
            onChange={show => {
              if(!show) scheduleLocalNotification(notificationIds.DAILY_READING, -1);
              setHideDailyReading(!show);
            }} />
          {!hideDailyReading ? <HourPicker label={'Notification Time'} value={dailyReadingTime} onChange={val => onTimeChange(notificationIds.DAILY_READING, val)} /> : null}

          <ButtonInput
            label={'Show Noon Prayer'}
            value={!hideNoonPrayer}
            onChange={show => {
              if(!show) scheduleLocalNotification(notificationIds.NOON_PRAYER, -1);
              setHideNoonPrayer(!show);
            }} />
          {!hideNoonPrayer ? <HourPicker label={'Notification Time'} value={noonPrayerTime} onChange={val => onTimeChange(notificationIds.NOON_PRAYER, val)} /> : null}

          <ButtonInput
            label={'Show Early Evening Prayer'}
            value={!hideEarlyEveningPrayer}
            onChange={show => {
              if(!show) scheduleLocalNotification(notificationIds.EARLY_EVENING_PRAYER, -1);
              setHideEarlyEveningPrayer(!show);
            }} />
          {!hideEarlyEveningPrayer ? <HourPicker label={'Notification Time'} value={earlyEveningPrayerTime} onChange={val => onTimeChange(notificationIds.EARLY_EVENING_PRAYER, val)} /> : null}

          <ButtonInput
            label={'Show Close of Day Prayer'}
            value={!hideCloseOfDayPrayer}
            onChange={show => {
              if(!show) scheduleLocalNotification(notificationIds.CLOSE_OF_DAY_PRAYER, -1);
              setHideCloseOfDayPrayer(!show);
            }} />
          {!hideCloseOfDayPrayer ? <HourPicker label={'Notification Time'} value={closeOfDayPrayerTime} onChange={val => onTimeChange(notificationIds.CLOSE_OF_DAY_PRAYER, val)} /> : null}

        </Form>
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
  hideVerseNumbers: PropTypes.bool,
  morningPrayerTime: PropTypes.number,
  dailyReadingTime: PropTypes.number,
  noonPrayerTime: PropTypes.number,
  earlyEveningPrayerTime: PropTypes.number,
  closeOfDayPrayerTime: PropTypes.number,
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
  setCloseOfDayPrayerTime: PropTypes.func
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
  },
  hourPickerContainer: {
    marginLeft: 15
  }
});

export default Settings;
