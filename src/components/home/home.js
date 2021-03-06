import React from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Content, H1, Grid, Col, Row } from 'native-base';
import { routes, colors, prayers, fontFamily } from '../../constants';
import Container from '../shared/container';
import Button from '../shared/button';
import Icon from '../shared/icon';
import StatusBar from '../shared/statusBar';
import Progress from '../../types/progress';
import WelcomeModal from '../shared/welcome-modal';

const Home = ({ darkMode, hideMorningPrayer, hideDailyReading, hideNoonPrayer, hideEarlyEveningPrayer, hideCloseOfDayPrayer, fontType, progress, welcomeDone, navigation, setWelcomeDone }) => {

  const headerColor = darkMode ? colors.PRIMARY_TEXT_DM : colors.PRIMARY_TEXT;

  return (
    <SafeAreaView flex={1} backgroundColor={darkMode ? colors.PRIMARY_DM : colors.BROWN}>
    <Container>
      <TouchableOpacity
        accessibilityLabel={'Menu'}
        accessibilityHint={'Navigates to menu'}
        accessibilityRole={'button'}
        style={styles.menuButton}
        onPress={() => navigation.push(routes.MENU)}><Icon style={[styles.menuButtonIcon, {color: headerColor}]}>menu</Icon></TouchableOpacity>
      <TouchableOpacity
        accessibilityLabel={'Bible'}
        accessibilityHint={'Navigates to Bible'}
        accessibilityRole={'button'}
        style={styles.bibleButton}
        onPress={() => navigation.push(routes.BIBLE)}><Icon style={[styles.menuButtonIcon, {color: headerColor}]}>book</Icon></TouchableOpacity>
      <StatusBar/>
      <Grid style={styles.grid}>
        <Col>
          <Row
            accessible={true}
            accessibilityLabel={'Rubric.Church'}
            accessibilityRole={'header'}
            style={styles.headerRow}>
            <Col>
              <Image style={styles.image} source={require('../../../images/rubric.church.png')} />
              <H1
                style={[styles.header, {fontFamily: fontFamily[fontType], color: headerColor}]}>Rubric.Church</H1>
            </Col>
          </Row>
          <Row style={styles.buttonsRow}>
            <Content>
              {!hideMorningPrayer ?
                <Button
                  accessibilityLabel={'Morning Prayer'}
                  accessibilityHint={'Navigates to the morning prayer'}
                  accessibilityState={progress.mp ? {checked: true} : {checked: false}}
                  onPress={() => navigation.push(routes.PRAYER, {prayer: prayers.MORNING_PRAYER})}
                  icon={progress.mp ? 'checkmark' : ''}>Morning Prayer</Button>
                :
                null
              }
              {!hideDailyReading ?
                <Button
                  accessibilityLabel={'Daily Reading'}
                  accessibilityHint={'Navigates to the daily reading'}
                  accessibilityState={progress.dr ? {checked: true} : {checked: false}}
                  onPress={() => navigation.push(routes.DAILY_READING)}
                  icon={progress.dr ? 'checkmark' : ''}>Daily Reading</Button>
                :
                null
              }
              {!hideNoonPrayer ?
                <Button
                  accessibilityLabel={'Noon Prayer'}
                  accessibilityHint={'Navigates to the noon prayer'}
                  accessibilityState={progress.np ? {checked: true} : {checked: false}}
                  onPress={() => navigation.push(routes.PRAYER, {prayer: prayers.NOON_PRAYER})}
                  icon={progress.np ? 'checkmark' : ''}>Noon Prayer</Button>
                :
                null
              }
              {!hideEarlyEveningPrayer ?
                <Button
                  accessibilityLabel={'Early Evening Prayer'}
                  accessibilityHint={'Navigates to the early evening prayer'}
                  accessibilityState={progress.ee ? {checked: true} : {checked: false}}
                  onPress={() => navigation.push(routes.PRAYER, {prayer: prayers.EARLY_EVENING_PRAYER})}
                  icon={progress.ee ? 'checkmark' : ''}>Early Evening Prayer</Button>
                :
                null
              }
              {!hideCloseOfDayPrayer ?
                <Button
                  accessibilityLabel={'Close of Day Prayer'}
                  accessibilityHint={'Navigates to the close of day prayer'}
                  accessibilityState={progress.eod ? {checked: true} : {checked: false}}
                  onPress={() => navigation.push(routes.PRAYER, {prayer: prayers.CLOSE_OF_DAY_PRAYER})}
                  icon={progress.eod ? 'checkmark' : ''}>Close of Day Prayer</Button>
                :
                null
              }
            </Content>
          </Row>
        </Col>
      </Grid>

      <WelcomeModal darkMode={darkMode} visible={!welcomeDone} onClose={setWelcomeDone} />

    </Container>
    </SafeAreaView>
  );
};
Home.propTypes = {
  hideMorningPrayer: PropTypes.bool,
  hideDailyReading: PropTypes.bool,
  hideNoonPrayer: PropTypes.bool,
  hideEarlyEveningPrayer: PropTypes.bool,
  hideCloseOfDayPrayer: PropTypes.bool,
  navigation: PropTypes.object,
  fontType: PropTypes.string,
  welcomeDone: PropTypes.bool,
  darkMode: PropTypes.bool,
  progress: PropTypes.instanceOf(Progress),
  setWelcomeDone: PropTypes.func
};

const styles = StyleSheet.create({
  image: {
    marginTop: -104,
    alignSelf: 'center',
    width: 200,
    height: 200,
    marginBottom: -20
  },
  header: {
    alignSelf: 'center',
    marginBottom: 10
  },
  headerRow: {
    flex: -1
  },
  buttonsRow: {
    marginTop: 15
  },
  grid: {
    flex: 1
  },
  menuButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
    marginRight: 10,
    flex: -1,
    paddingLeft: 5,
    paddingRight: 5
  },
  bibleButton: {
    marginTop: 4,
    marginRight: 8,
    alignSelf: 'flex-end',
    flex: -1,
    paddingLeft: 5,
    paddingRight: 5
  },
  menuButtonIcon: {
    fontSize: 40
  }
});

export default Home;
