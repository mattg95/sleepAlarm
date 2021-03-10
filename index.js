/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {App} from './App';
import {store} from './App';

import {name as appName} from './app.json';
import React from 'react';

console.log(App);

const appWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => appWrapper);
