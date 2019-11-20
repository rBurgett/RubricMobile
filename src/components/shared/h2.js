import { H2 as NBH2 } from 'native-base';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import {colors} from '../../constants';

const H2 = props => {
  const { style = {} } = props;
  const newStyles = [{
    color: props.darkMode ? colors.PRIMARY_TEXT_DM : colors.TEXT
  }, style];
  const newProps = {
    style: newStyles,
    ...omit(props, ['children', 'style'])
  };
  return <NBH2 {...newProps}>{props.children}</NBH2>;
};
H2.propTypes = {
  darkMode: PropTypes.bool,
  children: PropTypes.any,
  style: PropTypes.any
};
export default connect(
  ({ appState }) => ({
    darkMode: appState.darkMode
  })
)(H2);
