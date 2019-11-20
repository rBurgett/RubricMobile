import React from 'react';
import PropTypes from 'prop-types';
import Header from '../shared/header';
import WelcomeView from '../shared/welcome-view';

const Welcome = () => {
  return (
    <WelcomeView hideClose={true} />
  );
};
Welcome.navigationOptions = ({ navigation } ) => {
  return ({
    header: () => <Header navigation={navigation}>Welcome</Header>
  });
};
Welcome.propTypes = {
  navigation: PropTypes.object
};

export default Welcome;
