import {StatusBar as NBStatusBar, StyleSheet} from 'react-native';
import {colors} from '../../constants';
import React from 'react';

const StatusBar = ({}) => {
  return (
    <NBStatusBar style={styles.statusBar}  barStyle={'light-content'}/>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: colors.BROWN
  }
});

export default StatusBar;
