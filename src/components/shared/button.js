import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Button as NBButton, Text } from 'native-base';
import { colors as colorConstants, fontFamily } from '../../constants';
import Icon from './icon';

const Button = ({ icon, fontType, onPress, onLongPress = () => {}, children, style = {}, darkMode }) => {

  const backgroundColor = darkMode ? colorConstants.PRIMARY_DM : colorConstants.PRIMARY;
  const color = darkMode ? colorConstants.PRIMARY_TEXT_DM : colorConstants.PRIMARY_TEXT;

  return (
    <NBButton onPress={onPress} onLongPress={onLongPress} style={[styles.button, {backgroundColor}, style]} large iconLeft={icon && children ? true : false}>
      {icon ? <Icon style={{color}}>{icon}</Icon> : null}
      {children && typeof children === 'string' ? <Text style={{fontFamily: fontFamily[fontType], color}} uppercase={false}>{children}</Text> : null}
      {children && typeof children !== 'string' ? children : null}
    </NBButton>
  );
};
Button.propTypes = {
  icon: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  fontType: PropTypes.string,
  darkMode: PropTypes.bool,
  style: PropTypes.object,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
    justifyContent: 'center'
  }
});

export default connect(
  ({ appState }) => ({
    fontType: appState.fontType,
    darkMode: appState.darkMode
  })
)(Button);
