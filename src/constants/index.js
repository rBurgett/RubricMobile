import { Platform } from 'react-native';

export const actions = {
  SET_HIDE_MORNING_PRAYER: 'SET_HIDE_MORNING_PRAYER',
  SET_HIDE_NOON_PRAYER: 'SET_HIDE_NOON_PRAYER',
  SET_HIDE_DAILY_READING: 'SET_HIDE_DAILY_READING',
  SET_HIDE_EARLY_EVENING_PRAYER: 'SET_HIDE_EARLY_EVENING_PRAYER',
  SET_HIDE_CLOSE_OF_DAY_PRAYER: 'SET_HIDE_CLOSE_OF_DAY_PRAYER',
  SET_FONT_SIZE: 'SET_FONT_SIZE',
  SET_LINE_HEIGHT: 'SET_LINE_HEIGHT',
  SET_FONT_TYPE: 'SET_FONT_TYPE',
  SET_PROGRESS: 'SET_PROGRESS',
  SET_WELCOME_DONE: 'SET_WELCOME_DONE',
  SET_HIDE_VERSE_NUMBERS: 'SET_HIDE_VERSE_NUMBERS',
  SET_MORNING_PRAYER_TIME: 'SET_MORNING_PRAYER_TIME',
  SET_DAILY_READING_TIME: 'SET_DAILY_READING_TIME',
  SET_NOON_PRAYER_TIME: 'SET_NOON_PRAYER_TIME',
  SET_EARLY_EVENING_PRAYER_TIME: 'SET_EARLY_EVENING_PRAYER_TIME',
  SET_CLOSE_OF_DAY_PRAYER_TIME: 'SET_CLOSE_OF_DAY_PRAYER_TIME',
  BULK_SET: 'BULK_SET'
};

export const routes = {
  HOME: 'HOME',
  PRAYER: 'PRAYER',
  DAILY_READING: 'DAILY_READING',
  SETTINGS: 'SETTINGS',
  MENU: 'MENU',
  WELCOME: 'WELCOME',
  BIBLE: 'BIBLE',
  BIBLE_BOOK: 'BIBLE_BOOK',
  BIBLE_BOOK_CHAPTER: 'BIBLE_BOOK_CHAPTER',
  BOOKMARKS: 'BOOKMARKS'
};

export const colors = {
  TAN: '#f1f2e0',
  BROWN: '#683b11'
};

export const prayers = {
  MORNING_PRAYER: 'EARLY_MORNING_PRAYER',
  NOON_PRAYER: 'NOON_PRAYER',
  EARLY_EVENING_PRAYER: 'EARLY_EVENING_PRAYER',
  CLOSE_OF_DAY_PRAYER: 'CLOSE_OF_DAY_PRAYER'
};

export const notificationIds = {
  MORNING_PRAYER: '904580',
  DAILY_READING: '404829',
  NOON_PRAYER: '693818',
  EARLY_EVENING_PRAYER: '569459',
  CLOSE_OF_DAY_PRAYER: '405047'
};

export const storageKeys = {
  MORNING_PRAYER: 'MORNING_PRAYER',
  NOON_PRAYER: 'NOON_PRAYER',
  EARLY_EVENING_PRAYER: 'EARLY_EVENING_PRAYER',
  CLOSE_OF_DAY_PRAYER: 'CLOSE_OF_DAY_PRAYER',
  HIDE_MORNNG_PRAYER: 'HIDE_MORNING_PRAYER',
  HIDE_DAILY_READING: 'HIDE_DAILY_READING',
  HIDE_NOON_PRAYER: 'HIDE_NOON_PRAYER',
  HIDE_EARLY_EVENING_PRAYER: 'HIDE_EARLY_EVENING_PRAYER',
  HIDE_CLOSE_OF_DAY_PRAYER: 'HIDE_CLOSE_OF_DAY_PRAYER',
  FONT_SIZE: 'FONT_SIZE',
  LINE_HEIGHT: 'LINE_HEIGHT',
  FONT_TYPE: 'FONT_TYPE',
  HIDE_VERSE_NUMBERS: 'HIDE_VERSE_NUMBERS',
  WELCOME_DONE: 'WELCOME_DONE',
  BOOKMARKS: 'BOOKMARKS',
  MORNING_PRAYER_TIME: 'MORNING_PRAYER_TIME',
  DAILY_READING_TIME: 'DAILY_READING_TIME',
  NOON_PRAYER_TIME: 'NOON_PRAYER_TIME',
  EARLY_EVENING_PRAYER_TIME: 'EARLY_EVENING_PRAYER_TIME',
  CLOSE_OF_DAY_PRAYER_TIME: 'CLOSE_OF_DAY_PRAYER_TIME',
  INITIAL_SCHEDULING_DONE: 'INITIAL_SCHEDULING_DONE'
};

export const BASE_FONT_SIZE = 16;

export const fontTypes = {
  SERIF: 'SERIF',
  SANS_SERIF: 'SANS_SERIF'
};

export const fontFamily = {
  [fontTypes.SERIF]: Platform.OS === 'ios' ? 'DroidSerif' : 'serif',
  [fontTypes.SANS_SERIF]: undefined
};

export const SERIF_FONT_FAMILY = Platform.OS === 'ios' ? 'DroidSerif' : 'serif';

export const defaultTimes = {
  MORNING_PRAYER: 7,
  DAILY_READING: 10,
  NOON_PRAYER: 12,
  EARLY_EVENING_PRAYER: 18,
  CLOSE_OF_DAY_PRAYER: 21
};
