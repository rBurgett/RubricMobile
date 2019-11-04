import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Button as NBButton, Text } from 'native-base';
import Color from 'color';
import { colors as colorConstants, fontFamily } from '../../constants';
import Icon from './icon';

const tan = Color(colorConstants.TAN);
const brown = Color(colorConstants.BROWN);

const Button = ({ icon, fontType, onPress, onLongPress = () => {}, children, style = {} }) => {
  return (
    <NBButton onPress={onPress} onLongPress={onLongPress} style={[styles.button, styles.buttonText, style]} large iconLeft={icon && children ? true : false}>
      {icon ? <Icon style={styles.icon}>{icon}</Icon> : null}
      {children && typeof children === 'string' ? <Text style={[styles.buttonText, {fontFamily: fontFamily[fontType]}]} uppercase={false}>{children}</Text> : null}
      {children && typeof children !== 'string' ? children : null}
    </NBButton>
  );
};
Button.propTypes = {
  icon: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fontType: PropTypes.string,
  style: PropTypes.object,
  onPress: PropTypes.func
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
    justifyContent: 'center',
    backgroundColor: tan.darken(0.1)
  },
  buttonText: {
    color: brown
  },
  icon: {
    color: brown
  }
});

export default connect(
  ({ appState }) => ({
    fontType: appState.fontType
  })
)(Button);
