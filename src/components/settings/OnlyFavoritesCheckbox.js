import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';

import { CheckBox } from 'react-native-elements';
import { connect } from "react-redux";

import { onlyFavoriteOptionChange } from "../../store/actions/CurrencyActions";


class OnlyFavoritesCheckbox extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
        <CheckBox
            containerStyle={styles.inputContainers}
            style={styles.checkboxStyle}
            itemStyle={{ backgroundColor: "grey", color: "blue", fontSize: 14 }}
            iconType='ionicon'
            checkedIcon='md-checkbox-outline'
            uncheckedIcon='md-square-outline'
            title='Show only favorite currencies in list'
            checked={this.props.onlyFavorite}
            onPress={() => this.props.setOnlyFavoriteCurrencies(!this.props.onlyFavorite)}
        />
    )
  }
}


const styles = StyleSheet.create({
  checkboxStyle: {
    width: '100%'
  },

  inputContainers: {
    height: 50,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderColor: '#F6F6F6',
    borderWidth: 0,
  }
});


const mapStateToProps = state => {
  return {
    currenciesList: state.allCurrenciesList,
    base: state.baseCurrency,
    onlyFavorite: state.onlyFavoriteCurrencies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setOnlyFavoriteCurrencies: onlyFavorites => dispatch(onlyFavoriteOptionChange(onlyFavorites))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(OnlyFavoritesCheckbox);