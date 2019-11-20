import {colors, routes} from '../../constants';
import { Body, Header as NBHeader, Button, Left, Right, Title } from 'native-base';
import Icon from './icon';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StatusBar from './statusBar';

const Header = ({ children, navigation, darkMode, hideBack = false, rightButtonIcon = '', showMenuButton = false, rightButtonIconStyle = {}, onRightButtonPress }) => {

  const headerBackgroundColor = darkMode ? colors.PRIMARY_DM : colors.PRIMARY_TEXT;

  const headerTextStyle = {
    color: darkMode ? colors.PRIMARY_TEXT_DM : colors.CONTAINER
  };

  return (
    <NBHeader style={{backgroundColor: headerBackgroundColor}}>
      <StatusBar />
      <Left>
        {!hideBack ?
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon style={headerTextStyle}>arrow-back</Icon>
          </Button>
          :
          null
        }
      </Left>
      <Body>
        <Title style={headerTextStyle}>{children}</Title>
      </Body>
      {rightButtonIcon || showMenuButton ?
        <Right>
          {rightButtonIcon ?
            <Button transparent onPress={onRightButtonPress}>
              <Icon style={[headerTextStyle, rightButtonIconStyle]}>{rightButtonIcon}</Icon>
            </Button>
            :
            null
          }
          {showMenuButton ?
            <Button transparent onPress={() => navigation.push(routes.MENU)}>
              <Icon style={headerTextStyle}>menu</Icon>
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

export default connect(
  ({ appState }) => ({
    darkMode: appState.darkMode
  })
)(Header);
