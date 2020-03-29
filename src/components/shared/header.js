import {colors, routes} from '../../constants';
import { Body, Header as NBHeader, Button, Left, Right, Title } from 'native-base';
import Icon from './icon';
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StatusBar from './statusBar';
import Platform from '../../modules/platform';

const Header = ({ children, navigation, darkMode, hideBack = false, rightButtonIcon = '', showMenuButton = false, rightButtonIconStyle = {}, onRightButtonPress }) => {

  const headerBackgroundColor = darkMode ? colors.PRIMARY_DM : colors.PRIMARY_TEXT;

  const styles = {
    header: {
      backgroundColor: headerBackgroundColor
    },
    headerText: {
      color: darkMode ? colors.PRIMARY_TEXT_DM : colors.CONTAINER
    }
  };

  if(Platform.isIOS()) styles.header.borderBottomWidth = 0;

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
