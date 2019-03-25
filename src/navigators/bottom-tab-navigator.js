import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "react-navigation";
import {
  HomeNavigator,
  ConverterNavigator,
  SettingsNavigator
} from "./screen-stack-navigators";

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;

  let iconName;
  if (routeName === "All currencies") {
    iconName = "ios-list";
  } else if (routeName === "Converter") {
    iconName = "ios-swap";
  } else if (routeName === "Settings") {
    iconName = "ios-settings";
  }

  return <Ionicons name={iconName} size={25} color={tintColor} />;
};

const BottomTabNavigator = createBottomTabNavigator(
  {
    'All currencies': HomeNavigator,
    Converter: ConverterNavigator,
    Settings: SettingsNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor)
    }),
    tabBarOptions: {
      activeTintColor: "black",
      inactiveTintColor: "gray",
    }
  }
);

export default BottomTabNavigator;
