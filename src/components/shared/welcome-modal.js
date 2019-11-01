import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'react-native';
import WelcomeView from './welcome-view';

const WelcomeModal = ({ visible, onClose }) => {
  return (
    <Modal
      animationType={'none'}
      transparent={false}
      visible={visible}>
      <WelcomeView onClose={onClose} />
    </Modal>
  );
};
WelcomeModal.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func
};

export default connect()(WelcomeModal);
