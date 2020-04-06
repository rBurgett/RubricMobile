import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Content } from 'native-base';
import Container from '../shared/container';
import Header from '../shared/header';
import Button from '../shared/button';
import {routes} from '../../constants';

const Menu = ({ navigation }) => {
  return (
    <>
      <Header navigation={navigation}>Menu</Header>
      <Container>
        <Content>
          <Button
            accessibilityLabel={'Home'}
            accessibilityHint={'Navigates home'}
            icon={'home'} style={styles.button} onPress={() => navigation.push(routes.HOME)}>Home</Button>
          <Button
            accessibilityLabel={'Bible'}
            accessibilityHint={'Navigates to Bible'}
            icon={'book'} style={styles.button} onPress={() => navigation.push(routes.BIBLE)}>Bible</Button>
          <Button
            accessibilityLabel={'Settings'}
            accessibilityHint={'Navigates to settings'}
            icon={'cog'} style={styles.button} onPress={() => navigation.push(routes.SETTINGS)}>Settings</Button>
          <Button
            accessibilityLabel={'About'}
            accessibilityHint={'Navigates to about page'}
            icon={'help-circle-outline'} style={styles.button} onPress={() => navigation.push(routes.ABOUT)}>About</Button>
          <Button
            accessibilityLabel={'Welcome Message'}
            accessibilityHint={'Navigates to welcome message'}
            icon={'list'} style={styles.button} onPress={() => navigation.push(routes.WELCOME)}>Welcome Message</Button>
        </Content>
      </Container>
    </>
  );
};
Menu.propTypes = {
  darkMode: PropTypes.bool,
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'flex-start'
  }
});

export default Menu;
