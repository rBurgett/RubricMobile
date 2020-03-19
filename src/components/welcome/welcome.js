import React from 'react';
import PropTypes from 'prop-types';
import Header from '../shared/header';
import WelcomeView from '../shared/welcome-view';

const Welcome = ({ navigation }) => {
  return (
    <>
      <Header navigation={navigation}>Welcome</Header>
      <WelcomeView hideClose={true} />
    </>
  );
};
Welcome.propTypes = {
  navigation: PropTypes.object
};

export default Welcome;
