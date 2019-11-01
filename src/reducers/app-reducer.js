import { actions, BASE_FONT_SIZE, fontTypes } from '../constants';
import Progress from '../types/progress';

const getInitialState = () => ({
  morningPrayer: 'Lord God, almighty and everlasting Father, you have brought us in safety to this new day: Preserve us with your mighty power, that we may not fall into sin, nor be overcome by adversity; and in all we do, direct us to the fulfilling of your purpose; through Jesus Christ our Lord.',
  noonPrayer: 'Lord Jesus Christ, you said to your apostles, "Peace I give to you; my own peace I leave with you:" Regard not our sins, but the faith of your Church, and give to us the peace and unity of that heavenly City, where with the Father and the Holy Spirit you live and reign, now and for ever.',
  earlyEveningPrayer: 'Lord Jesus, stay with us, for evening is at hand and the day is past; be our companion in the way, kindle our hearts, and awaken hope, that we may know you as you are revealed in Scripture and the breaking of bread. Grant this for the sake of your love.',
  closeOfDayPrayer: 'Visit this place, O Lord, and drive far from it all snares of the enemy; let your holy angels dwell with us to preserve us in peace; and let your blessing be upon us always; through Jesus Christ our Lord.',
  hideMorningPrayer: false,
  hideNoonPrayer: false,
  hideDailyReading: false,
  hideEarlyEveningPrayer: false,
  hideCloseOfDayPrayer: false,
  fontSize: BASE_FONT_SIZE,
  lineHeight: 1.5,
  fontType: fontTypes.SANS_SERIF,
  progress: new Progress()
});

export default (state = getInitialState(), { type, payload }) => {
  switch(type) {
    case actions.SET_HIDE_MORNING_PRAYER:
      return {
        ...state,
        hideMorningPrayer: payload
      };
    case actions.SET_HIDE_DAILY_READING:
      return {
        ...state,
        hideDailyReading: payload
      };
    case actions.SET_HIDE_NOON_PRAYER:
      return {
        ...state,
        hideNoonPrayer: payload
      };
    case actions.SET_HIDE_EARLY_EVENING_PRAYER:
      return {
        ...state,
        hideEarlyEveningPrayer: payload
      };
    case actions.SET_HIDE_CLOSE_OF_DAY_PRAYER:
      return {
        ...state,
        hideCloseOfDayPrayer: payload
      };
    case actions.SET_FONT_SIZE:
      return {
        ...state,
        fontSize: payload
      };
    case actions.SET_LINE_HEIGHT:
      return {
        ...state,
        lineHeight: payload
      };
    case actions.SET_FONT_TYPE:
      return {
        ...state,
        fontType: payload
      };
    case actions.SET_PROGRESS:
      return {
        ...state,
        progress: payload
      };
    case actions.BULK_SET:
      return {
        ...state,
        ...payload
      };
    default:
      return state;
  }
};
