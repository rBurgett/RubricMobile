import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Button as NBButton, Text } from 'native-base';
import Color from 'color';
import { colors as colorConstants, SERIF_FONT_FAMILY } from '../../constants';
import Icon from './icon';

const tan = Color(colorConstants.TAN);
const brown = Color(colorConstants.BROWN);

const Button = ({ icon, onPress, children }) => {
  return (
    <NBButton onPress={onPress} style={styles.button} large iconLeft={icon ? true : false}>
      {icon ? <Icon style={styles.icon}>{icon}</Icon> : null}
      <Text style={styles.buttonText}>{children}</Text>
    </NBButton>
  );
};
Button.propTypes = {
  icon: PropTypes.string,
  children: PropTypes.string,
  onPress: PropTypes.func
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
    justifyContent: 'center',
    backgroundColor: tan.darken(0.1)
  },
  buttonText: {
    fontFamily: SERIF_FONT_FAMILY,
    color: brown
  },
  icon: {
    color: brown
  }
});

export default Button;
