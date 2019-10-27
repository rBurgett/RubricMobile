import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Container as NBContainer } from 'native-base';
import { colors } from '../../constants';

const Container = ({ children, style = {} }) => {
  return (
    <NBContainer style={[styles.container, style]}>
      {children}
    </NBContainer>
    );
};
Container.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: colors.TAN
  }
});

export default Container;
