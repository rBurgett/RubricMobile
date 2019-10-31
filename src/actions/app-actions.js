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

export const setProgress = progress => ({
  type: actions.SET_PROGRESS,
  payload: progress
});
