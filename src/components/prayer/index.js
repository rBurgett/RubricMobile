import React from 'react';
import { connect } from 'react-redux';
import Prayer from './prayer';

export default connect(
  ({ appState }) => ({
    morningPrayer: appState.morningPrayer,
    noonPrayer: appState.noonPrayer,
    earlyEveningPrayer: appState.earlyEveningPrayer,
    closeOfDayPrayer: appState.closeOfDayPrayer
  })
)(Prayer);
