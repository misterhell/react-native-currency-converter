import { View, StyleSheet } from "react-native";
import React, { Component } from "react";
import DividerLine from '../components/DividerLine';
import CurrencyPicker from '../components/settings/BaseCurrencyPicker';
import FavoriteCurrenciesPicker from '../components/settings/FavoriteCurrenciesPicker';
import OnlyFavoritesCheckbox from '../components/settings/OnlyFavoritesCheckbox';
import { HeaderTitle } from '../components/header/Header';
import { PRIMARY_COLOR } from '../constants/app-theme';

class SettingsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle:<HeaderTitle icon='ios-settings' title='Settings'/>,
      headerBackTitle: "Settings",
      headerTitleStyle: { color: 'white' },
      headerLayoutPreset: "center",
      headerStyle: { backgroundColor: PRIMARY_COLOR },
    };
  };

  render () {

    return (
        <View style={styles.container}>

          <CurrencyPicker/>

          <FavoriteCurrenciesPicker/>


          <OnlyFavoritesCheckbox/>

          <DividerLine top={10} bottom={10}/>

        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    paddingTop: 20
  }
});


export default SettingsScreen;
