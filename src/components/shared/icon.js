import React from 'react';
import PropTypes from 'prop-types';
import { Icon as NBIcon } from 'native-base';

const Icon = ({ children, style = {} }) => {
  return <NBIcon name={children} style={style} />;
};
Icon.propTypes = {
  children: PropTypes.string,
  style: PropTypes.object
};

export default Icon;
