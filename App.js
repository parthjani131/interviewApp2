import React from 'react';
import {StatusBar, LogBox} from 'react-native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';

import colors from './Config/Colors';
import Navigator from './Navigation/Navigator';
import Reducers from './Store/reducers';

LogBox.ignoreAllLogs();

const rootReducer = combineReducers({
  Reducers: Reducers,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <Navigator />
      <StatusBar backgroundColor={colors.buttonColor} />
    </Provider>
  );
};

export default App;
