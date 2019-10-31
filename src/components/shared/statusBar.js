import { StatusBar as NBStatusBar } from 'react-native';
import { colors } from '../../constants';
import React from 'react';

const StatusBar = ({}) => {
  return (
    <NBStatusBar backgroundColor={colors.BROWN} barStyle={'light-content'}/>
  );
};

export default StatusBar;
