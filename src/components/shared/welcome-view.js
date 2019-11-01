import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { Content, Text, H1 } from 'native-base';
import Container from './container';
import Button from './button';
import { fontFamily } from '../../constants';

const text = `The world is seemingly dominated by consumer-driven churches and social clubs. People are leaving that paradigm in droves, yet they still want the fellowship and connection which the church is supposed to provide. Rubric.Church exists as an experiment to ask how technology can bridge that gap.

What is best accomplished via technology and what can only be accomplished in person? There is no reason to let the cultural and technological constrains of the Middle Ages continue to define what "church" looks like today.

The Rubric mobile application is our first step forward in this experiment. You might attend "church services" or you might not, but Rubric is here to connect you to something bigger than yourself, something even bigger than a local congregation.

The Book of Common Prayer is a small, centuries-old book containing the traditional services of the Anglican and Episcopal church. But, even beyond that, it contains daily devotional prayers for individuals and groups along with Bible readings. The Rubric mobile application takes these prayers and readings and provides them to anybody in a convenient and engaging form.

Every day, thousands or even millions of people from across countless Christian denominations and group take time out of their day to remember God and to center themselves by praying these prayers and reading these scripture passages. When you pray these prayers and read these passages, you join people all around the world who are praying with you and pondering the same scripture passages as you. Plus, you are building positive spiritual habits into your life which will benefit you, your family, and ultimately the world around you.

This application is only the first step for Rubric.Church, but in many ways it provides the foundation for much of what we hope to eventually accomplish. Please join us as we focus our lives around God and spiritually connect with Christians from all around the world.`;

const WelcomeView = ({ fontType, hideClose, onClose }) => {

  const font = fontFamily[fontType];

  return (
    <Container style={styles.container}>
      <Content style={styles.content}>

        <H1 style={[styles.header, {fontFamily: font}]}>Hello and welcome to Rubric!</H1>

        <Text style={[styles.text, {fontFamily: font}]}>{text}</Text>

        <View style={styles.buttonContainer}>
          {!hideClose ?
            <Button onPress={() => onClose()}>Close</Button>
          :
          null
        }
        </View>

      </Content>
    </Container>
  );
};
WelcomeView.propTypes = {
  fontType: PropTypes.string,
  hideClose: PropTypes.bool,
  onClose: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingBottom: 0
  },
  content: {
    padding: 10
  },
  header: {
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'
  },
  text: {
    fontSize: 16,
    lineHeight: 30
  },
  buttonContainer: {
    paddingTop: 20,
    paddingBottom: 15
  }
});

export default connect(
  ({ appState }) => ({
    fontType: appState.fontType
  })
)(WelcomeView);
