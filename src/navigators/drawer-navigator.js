import React, { Component } from "react";
import { createDrawerNavigator, createAppContainer } from "react-navigation";
import BottomTabNavigator from "./bottom-tab-navigator";
import { SettingsNavigator } from "./screen-stack-navigators";
import { fetchCurrenciesAndCounties } from '../store/actions/CurrencyActions';
import { connect } from 'react-redux';


const DrawerNavigator = createDrawerNavigator({
  Home: BottomTabNavigator,
  Settings: SettingsNavigator
});

const AppContainer = createAppContainer(DrawerNavigator);


class Drawer extends React.Component {

  async componentDidMount () {
    this.props.fetchCurrenciesAndCounties();
  }

  render () {
    return (
        <AppContainer/>
    );
  };
}


const mapDispatchToProps = dispatch => {
  return {
    fetchCurrenciesAndCounties: () => dispatch(fetchCurrenciesAndCounties()),
    fetchCurrencySuccess: () => dispatch(fetchCurrencySuccess())
  }
};

export default connect(null, mapDispatchToProps)(Drawer);
