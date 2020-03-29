import PushNotification from 'react-native-push-notification';
import { colors, notificationIds } from '../constants';
import Platform from './platform';

export const scheduleLocalNotification = (id, hour) => {
  PushNotification.cancelLocalNotifications({id});
  if(hour < 0) return;
  let title, message;
  switch(id) {
    case notificationIds.MORNING_PRAYER:
      title = 'Morning Prayer Time!';
      message = 'It is time for your morning prayer.';
      break;
    case notificationIds.DAILY_READING:
      title = 'Daily Reading Time!';
      message = 'It is time for your daily Bible reading.';
      break;
    case notificationIds.NOON_PRAYER:
      title = 'Noon Prayer Time!';
      message = 'It is time for your noon prayer.';
      break;
    case notificationIds.EARLY_EVENING_PRAYER:
      title = 'Early Evening Prayer Time!';
      message = 'It is time for your early evening prayer.';
      break;
    case notificationIds.CLOSE_OF_DAY_PRAYER:
      title = 'Close of Day Prayer Time!';
      message = 'It is time for your close of day prayer.';
      break;
  }
  let date = new Date();
  date.setHours(hour, 0, 0, 0);
  if(date.getTime() < Date.now()) date = new Date(date.getTime() + (1000 * 60 * 60 * 24));
  if(Platform.isAndroid()) {
    PushNotification.localNotificationSchedule({
      date,
      repeatType: 'day',
      id,
      largeIcon: 'ic_launcher_round',
      smallIcon: 'ic_launcher_round',
      subText: id === notificationIds.DAILY_READING ? 'Reading Reminder' : 'Prayer Reminder',
      color: colors.BROWN,
      title,
      message
    });
  } else if(Platform.isIOS()) {
    PushNotification.localNotificationSchedule({
      date,
      repeatType: 'day',
      id,
      title,
      message
    });
  }
};
