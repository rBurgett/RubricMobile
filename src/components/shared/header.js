import {colors, routes} from '../../constants';
import { Body, Header as NBHeader, Button, Left, Right, Title } from 'native-base';
import { StyleSheet } from 'react-native';
import Icon from './icon';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StatusBar from './statusBar';
import Platform from '../../modules/platform';

const Header = ({ children, navigation, darkMode, hideBack = false, rightButtonIcon = '', showMenuButton = false, rightButtonIconStyle = {}, onRightButtonPress }) => {

  const isIOS = Platform.isIOS();

  const headerBackgroundColor = darkMode ? colors.PRIMARY_DM : colors.PRIMARY_TEXT;

  const headerStyle = {
    backgroundColor: headerBackgroundColor
  };
  const headerText = {
    color: darkMode ? colors.PRIMARY_TEXT_DM : colors.CONTAINER
  };

  if(isIOS) headerStyle.borderBottomWidth = 0;

  return (
    <NBHeader style={[styles.header, headerStyle]}>
      <StatusBar />
      <Left style={isIOS ? styles.leftIOS : styles.leftAndroid}>
        {!hideBack ?
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon style={headerText}>arrow-back</Icon>
          </Button>
          :
          null
        }
      </Left>

      <Body style={isIOS ? styles.bodyIOS : styles.bodyAndroid}>
        <Title style={headerText}>{children}</Title>
      </Body>
      {isIOS || rightButtonIcon || showMenuButton ?
        <Right style={isIOS ? styles.rightIOS : styles.rightAndroid}>
          {rightButtonIcon ?
            <Button transparent onPress={onRightButtonPress}>
              <Icon style={[headerText, rightButtonIconStyle]}>{rightButtonIcon}</Icon>
            </Button>
            :
            null
          }
          {showMenuButton ?
            <Button transparent onPress={() => navigation.push(routes.MENU)}>
              <Icon style={headerText}>menu</Icon>
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
  darkMode: PropTypes.bool,
  children: PropTypes.string,
  navigation: PropTypes.object,
  hideBack: PropTypes.func,
  rightButtonIcon: PropTypes.string,
  rightButtonIconStyle: PropTypes.object,
  onRightButtonPress: PropTypes.func,
  showMenuButton: PropTypes.bool
};

const styles = StyleSheet.create({
  leftIOS: {
    flex: 1
  },
  bodyIOS: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightIOS: {
    flex: 1
  },
  leftAndroid: {
  },
  bodyAndroid: {
  },
  rightAndroid: {
  }
});

export default connect(
  ({ appState }) => ({
    darkMode: appState.darkMode
  })
)(Header);
