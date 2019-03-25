import { View, Text, StyleSheet, Button, Alert, ScrollView, ActivityIndicator } from "react-native";
import React, { Component } from "react";
import { connect } from 'react-redux';
import { fetchCurrenciesAndCounties } from '../store/actions/CurrencyActions';
import CurrencyList from '../components/CurrenciesList';
import Search from '../components/header/Searchbar';
import BaseCurrency from '../components/header/BaseCurrency';
import { PRIMARY_COLOR } from "../constants/app-theme";


class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle:
          <View style={styles.headerTitle}>
            <Search/>
            <BaseCurrency/>
          </View>,
      headerLayoutPreset: "center",
      headerStyle: {
        backgroundColor: PRIMARY_COLOR,
        height: 105
      },
    };
  };


  render () {
    if (this.props.isLoading) {
      return (
          <View style={{ height: '100%', justifyContent: 'center' }}>
            <ActivityIndicator color={PRIMARY_COLOR} size="large"/>
          </View>
      )
    }

    return (
        <View style={styles.container}>
          <ScrollView>
            <CurrencyList/>
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTitle: {
    width: '100%',
    height: '100%',
    borderWidth: 0
  }
});


const mapStateToProps = state => {
  return {
    isLoading: state.loading,
  };
};


export default connect(mapStateToProps)(HomeScreen);