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
