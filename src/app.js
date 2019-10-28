import React, { useEffect } from 'react';
import { Root } from 'native-base';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import appReducer from './reducers/app-reducer';
import { routes as routeConstants } from './constants';
import Home from './components/home';
import Prayer from './components/prayer';
import DailyReading from './components/daily-reading';

const combinedReducers = combineReducers({
  appState: appReducer
});

const store = createStore(combinedReducers);
store.subscribe(() => {
  const state = store.getState();
  console.log('state', state.appState);
});

const routes = {
  [routeConstants.HOME]: {
    screen: Home,
    headerMode: 'none',
    navigationOptions: () => ({
      header: null
    })
  },
  [routeConstants.PRAYER]: {
    screen: Prayer
  },
  [routeConstants.DAILY_READING]: {
    screen: DailyReading
  }
};
const stackConfig = {
  initialRouteName: routeConstants.HOME
};
const StackNavigation = createStackNavigator(routes, stackConfig);
const AppContainer = createAppContainer(StackNavigation);

const App: () => React$Node = () => {

  useEffect(() => {
    (async function() {
      try {
        // const date = moment();
        // const day = date.format('D');
        // const month = date.format('M');
        // const year = date.format('YYYY');
        // const res = await fetch(`http://www.esvapi.org/v2/rest/readingPlanQuery?key=TEST&reading-plan=bcp&date=${year}-${month}-${day}&include-footnotes=false&include-audio-link=true&audio-format=mp3&output-format=plain-text`);
        // const text = await res.text();
        // console.log(text);
      } catch(err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <Root>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </Root>
  );
};

export default App;
