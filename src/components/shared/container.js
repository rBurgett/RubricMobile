import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet} from 'react-native';
import { Container as NBContainer } from 'native-base';
import { colors } from '../../constants';

const Container = ({ children, darkMode, style = {} }) => {
  return (
    <NBContainer style={[styles.container, {backgroundColor: darkMode ? colors.CONTAINER_DM : colors.CONTAINER}, style]}>
      {children}
    </NBContainer>
    );
};
Container.propTypes = {
  children: PropTypes.any,
  darkMode: PropTypes.bool,
  style: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    padding: 5
  }
});

export default connect(
  ({ appState }) => ({
    darkMode: appState.darkMode
  })
)(Container);
