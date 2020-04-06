import React from 'react';
import PropTypes from 'prop-types';
import { Col, Grid, H1, Row, View } from 'native-base';
import { Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { connect } from 'react-redux';
import Header from '../shared/header';
import Container from '../shared/container';
import { colors, fontFamily as fontFamilies } from '../../constants';
import Text from '../shared/text';
import Icon from '../shared/icon';
import { version } from '../../../package.json';

let LinkButton = ({ label, icon, darkMode, fontType, destination }) => {
  const color = darkMode ? colors.PRIMARY_TEXT_DM : colors.PRIMARY_TEXT;
  const fontFamily = fontFamilies[fontType];
  const onPress = () => {
    Linking.openURL(destination)
      .catch(console.error);
  };
  return (
    <View>
      <TouchableOpacity accessibilityLabel={label} accessibilityRole={'link'} onPress={onPress}>
        <Icon style={[styles.linkButtonIcon, {color, fontFamily}]}>{icon}</Icon>
      </TouchableOpacity>
    </View>
  );
};
LinkButton.propTypes = {
  label: PropTypes.string,
  darkMode: PropTypes.bool,
  fontType: PropTypes.string,
  destination: PropTypes.string,
  icon: PropTypes.string
};
LinkButton = connect(
  ({ appState }) => ({
    fontType: appState.fontType,
    darkMode: appState.darkMode
  })
)(LinkButton);

const About = ({ darkMode, fontType, navigation }) => {

  const headerColor = darkMode ? colors.PRIMARY_TEXT_DM : colors.PRIMARY_TEXT;
  const fontFamily = fontFamilies[fontType];
  const versionString = `Version ${version}`;

  return (
    <>
      <Header navigation={navigation}>About</Header>
      <Container style={styles.container}>
      <Grid style={styles.grid}>
        <Col>
          <Row
            accessible={true}
            accessibilityLabel={`Rubric.Church ${versionString}`}
            accessibilityRole={'header'}
            style={styles.headerRow}>
            <Col>
              <Image style={styles.image} source={require('../../../images/rubric.church.png')} />
              <H1
                style={[styles.header, {fontFamily, color: headerColor}]}>Rubric.Church</H1>
              <View style={styles.textView}>
                <Text style={{fontFamily}}>{versionString}</Text>
              </View>
            </Col>
          </Row>
          <Row style={styles.buttonsRow}>
            <View style={styles.linksContainer}>
              <LinkButton label={'Rubric Website'} icon={'globe'} destination={'https://rubric.church'} />
              <LinkButton label={'Facebook'} icon={'logo-facebook'} destination={'https://www.facebook.com/rubric.church'} />
              <LinkButton label={'Instagram'} icon={'logo-instagram'} destination={'https://www.instagram.com/rubric.church'} />
              <LinkButton label={'Twitter'} icon={'logo-twitter'} destination={'https://twitter.com/RubricChurch'} />
              <LinkButton label={'Email'} icon={'mail'} destination={'mailto:contact@rubric.church'} />
            </View>
          </Row>
        </Col>
      </Grid>
      </Container>
    </>
  );
};
About.propTypes = {
  darkMode: PropTypes.bool,
  fontType: PropTypes.string,
  navigation: PropTypes.object
};
const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    width: 200,
    height: 200,
    marginBottom: -20
  },
  header: {
    alignSelf: 'center'
  },
  headerRow: {
    flex: -1
  },
  buttonsRow: {
    marginTop: 15
  },
  container: {
    paddingTop: 0,
    paddingBottom: 0
  },
  content: {
    padding: 10
  },
  grid: {
    flex: 1
  },
  textView: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  linksContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  },
  linkButtonIcon: {
    fontSize: 40,
    marginLeft: 10,
    marginRight: 10
  }
});

export default About;
