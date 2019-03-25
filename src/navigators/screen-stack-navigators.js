import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ConverterScreen from "../screens/ConverterScreen";
import { PRIMARY_COLOR } from "../constants/app-theme";

export const HomeNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: { backgroundColor: PRIMARY_COLOR}
  }
});

export const SettingsNavigator = createStackNavigator({
  Settings: {  screen: SettingsScreen }
});

export const ConverterNavigator = createStackNavigator({
  Converter: {
    screen: ConverterScreen,
    navigationOptions: {
      header: null,
    }
  }
});



