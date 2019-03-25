import React, { Component } from 'react';
import Drawer from './src/navigators/drawer-navigator';
import { Provider } from "react-redux";
import store from "./src/store/index";
import { StatusBar } from "react-native";
import { PRIMARY_COLOR } from './src/constants/app-theme';

export default class App extends React.Component {

  render () {
    return (
          <Provider store={store}>
            <StatusBar backgroundColor={PRIMARY_COLOR} barStyle="light-content" />
            <Drawer/>
          </Provider>
    );
  }
}

