import { actions } from '../constants';

export const setHideMorningPrayer = hide => ({
  type: actions.SET_HIDE_MORNING_PRAYER,
  payload: hide
});

export const setHideDailyReading = hide => ({
  type: actions.SET_HIDE_DAILY_READING,
  payload: hide
});

export const setHideNoonPrayer = hide => ({
  type: actions.SET_HIDE_NOON_PRAYER,
  payload: hide
});

export const setHideEarlyEveningPrayer = hide => ({
  type: actions.SET_HIDE_EARLY_EVENING_PRAYER,
  payload: hide
});

export const setHideCloseOfDayPrayer = hide => ({
  type: actions.SET_HIDE_CLOSE_OF_DAY_PRAYER,
  payload: hide
});

export const setFontSize = fontSize => ({
  type: actions.SET_FONT_SIZE,
  payload: fontSize
});

export const setLineHeight = lineHeight => ({
  type: actions.SET_LINE_HEIGHT,
  payload: lineHeight
});

export const setFontType = fontType => ({
  type: actions.SET_FONT_TYPE,
  payload: fontType
});

export const setProgress = progress => ({
  type: actions.SET_PROGRESS,
  payload: progress
});

export const setWelcomeDone = welcomeDone => ({
  type: actions.SET_WELCOME_DONE,
  payload: welcomeDone
});

export const setHideVerseNumbers = hideVerseNumbers => ({
  type: actions.SET_HIDE_VERSE_NUMBERS,
  payload: hideVerseNumbers
});

export const setMorningPrayerTime = morningPrayerTime => ({
  type: actions.SET_MORNING_PRAYER_TIME,
  payload: morningPrayerTime
});

export const setDailyReadingTime = dailyReadingTime => ({
  type: actions.SET_DAILY_READING_TIME,
  payload: dailyReadingTime
});

export const setNoonPrayerTime = noonPrayerTime => ({
  type: actions.SET_NOON_PRAYER_TIME,
  payload: noonPrayerTime
});

export const setEarlyEveningPrayerTime = earlyEveningPrayerTime => ({
  type: actions.SET_EARLY_EVENING_PRAYER_TIME,
  payload: earlyEveningPrayerTime
});

export const setCloseOfDayPrayerTime = closeOfDayPrayerTime => ({
  type: actions.SET_CLOSE_OF_DAY_PRAYER_TIME,
  payload: closeOfDayPrayerTime
});

export const setDarkMode = darkMode => ({
  type: actions.SET_DARK_MODE,
  payload: darkMode
});

export const bulkSet = (data = {}) => ({
  type: actions.BULK_SET,
  payload: data
});
