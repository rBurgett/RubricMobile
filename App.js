import React from 'react';
import {
  SafeAreaView,
  StyleSheet
} from 'react-native';
import { Root, H1 } from 'native-base';
import Icon from './src/components/shared/icon';

const App: () => React$Node = () => {
  return (
    <SafeAreaView>
      <Root>
        <Icon>play</Icon>
        <H1>Hello</H1>
      </Root>
    </SafeAreaView>
  );
};

export default App;
