import { StatusBar as NBStatusBar } from 'react-native';
import { connect } from 'react-redux';
import { colors } from '../../constants';
import React from 'react';
import PropTypes from 'prop-types';

const StatusBar = ({ darkMode }) => {
  return (
    <NBStatusBar backgroundColor={darkMode ? colors.PRIMARY_DM : colors.PRIMARY_TEXT} barStyle={'light-content'}/>
  );
};
StatusBar.propTypes = {
  darkMode: PropTypes.bool
};

export default connect(
  ({ appState }) => ({
    darkMode: appState.darkMode
  })
)(StatusBar);
