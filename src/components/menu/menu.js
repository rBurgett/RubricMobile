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
    <Container>
      <Content>
        <Button icon={'home'} style={styles.button} onPress={() => navigation.navigate(routes.HOME)}>Home</Button>
        <Button icon={'cog'} style={styles.button} onPress={() => navigation.navigate(routes.SETTINGS)}>Settings</Button>
        <Button icon={'list'} style={styles.button} onPress={() => navigation.navigate(routes.WELCOME)}>Welcome Message</Button>
      </Content>
    </Container>
  );
};
Menu.navigationOptions = ({ navigation } ) => {
  return ({
    header: <Header navigation={navigation}>Menu</Header>
  });
};
Menu.propTypes = {
  navigation: PropTypes.object
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'flex-start'
  }
});

export default Menu;
