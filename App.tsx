/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '$redux';
import Navigation from '$navigation/Navigation';
// import KeepAwake from '@sayem314/react-native-keep-awake';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Provider store={store}>
        <Navigation />
      </Provider>
    </>
  );
};

export default App;
