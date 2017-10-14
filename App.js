/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import Home from './src/Home';
import TakePicture from './src/TakePicture';

const App = () => (
  <Router>
    <Stack key="root">
      <Scene key="home" title="home" component={Home} />
      <Scene
        key="takePicture"
        title="take a picture"
        back
        component={TakePicture}
      />
    </Stack>
  </Router>
);

export default App;
