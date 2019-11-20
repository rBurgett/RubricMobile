import { Text as NBText } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import {colors} from '../../constants';

const Text = props => {
  const { style = {} } = props;
  let newStyles;
  const color = props.darkMode ? colors.PRIMARY_TEXT_DM : colors.TEXT;
  if(Array.isArray(style)) {
    newStyles = [
      {color},
      ...style
    ];
  } else {
    newStyles = [{color}, style];
  }
  const newProps = {
    style: newStyles,
    ...omit(props, ['children', 'style'])
  };
  return <NBText {...newProps}>{props.children || ''}</NBText>;
};
Text.propTypes = {
  darkMode: PropTypes.bool,
  children: PropTypes.any,
  style: PropTypes.any
};
export default connect(
  ({ appState }) => ({
    darkMode: appState.darkMode
  })
)(Text);
