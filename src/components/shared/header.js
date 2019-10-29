import { colors } from '../../constants';
import { Body, Header as NBHeader, Button as NBButton, Left, Title } from 'native-base';
import Icon from './icon';
import { StatusBar, StyleSheet } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ children, navigation, hideBack = false }) => {
  return (
    <NBHeader style={styles.header}>
      <StatusBar backgroundColor={colors.BROWN} barStyle="light-content"/>
      <Left>
        {hideBack ?
          null
          :
          <NBButton transparent onPress={() => navigation.pop()}>
            <Icon style={styles.headerText}>arrow-back</Icon>
          </NBButton>}
      </Left>
      <Body>
        <Title style={styles.headerText}>{children}</Title>
      </Body>
    </NBHeader>
  );
};
Header.propTypes = {
  children: PropTypes.any,
  navigation: PropTypes.object,
  hideBack: PropTypes.func
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.BROWN
  },
  headerText: {
    color: colors.TAN
  }
});

export default Header;
