import {colors, routes} from '../../constants';
import { Body, Header as NBHeader, Button, Left, Right, Title, Text } from 'native-base';
import Icon from './icon';
import { StyleSheet } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import StatusBar from './statusBar';

const Header = ({ children, navigation, hideBack = false, rightButtonIcon = '', showMenuButton = false, rightButtonIconStyle = {}, onRightButtonPress }) => {
  return (
    <NBHeader style={styles.header}>
      <StatusBar />
      <Left>
        {!hideBack ?
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon style={styles.headerText}>arrow-back</Icon>
          </Button>
          :
          null
        }
      </Left>
      <Body>
        <Title style={styles.headerText}>{children}</Title>
      </Body>
      {rightButtonIcon || showMenuButton ?
        <Right>
          {rightButtonIcon ?
            <Button transparent onPress={onRightButtonPress}>
              <Icon style={[styles.headerText, rightButtonIconStyle]}>{rightButtonIcon}</Icon>
            </Button>
            :
            null
          }
          {showMenuButton ?
            <Button transparent onPress={() => navigation.push(routes.MENU)}>
              <Icon style={styles.headerText}>menu</Icon>
            </Button>
            :
            null
          }
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
  rightButtonIconStyle: PropTypes.object,
  onRightButtonPress: PropTypes.func,
  showMenuButton: PropTypes.bool
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
