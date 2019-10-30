import { colors } from '../../constants';
import { Body, Header as NBHeader, Button, Left, Right, Title, Text } from 'native-base';
import Icon from './icon';
import { StyleSheet } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import StatusBar from './statusBar';

const Header = ({ children, navigation, hideBack = false, rightButtonIcon = '', onRightButtonPress }) => {
  return (
    <NBHeader style={styles.header}>
      <StatusBar/>
      <Left>
        {!hideBack ?
          <Button transparent onPress={() => navigation.pop()}>
            <Icon style={styles.headerText}>arrow-back</Icon>
          </Button>
          :
          null
        }
      </Left>
      <Body>
        <Title style={styles.headerText}>{children}</Title>
      </Body>
      {rightButtonIcon ?
        <Right>
          <Button transparent onPress={onRightButtonPress}>
            <Icon style={styles.headerText}>{rightButtonIcon}</Icon>
          </Button>
        </Right>
        :
        null
      }
    </NBHeader>
  );
};
Header.propTypes = {
  children: PropTypes.string,
  navigation: PropTypes.object,
  hideBack: PropTypes.func,
  rightButtonIcon: PropTypes.string,
  onRightButtonPress: PropTypes.func
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
