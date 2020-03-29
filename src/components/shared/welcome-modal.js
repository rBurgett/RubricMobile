import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal, SafeAreaView } from 'react-native';
import WelcomeView from './welcome-view';
import { colors } from '../../constants';

const WelcomeModal = ({ darkMode, visible, onClose }) => {
  return (
      <Modal
        animationType={'none'}
        transparent={false}
        visible={visible}>
        <SafeAreaView flex={1} backgroundColor={darkMode ? colors.PRIMARY_DM : colors.BROWN}>
          <WelcomeView useSafeView={true} onClose={onClose} />
        </SafeAreaView>
      </ Modal>
  );
};
WelcomeModal.propTypes = {
  darkMode: PropTypes.bool,
  visible: PropTypes.bool,
  onClose: PropTypes.func
};

export default connect()(WelcomeModal);
