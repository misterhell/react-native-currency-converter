import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Picker,
  View,
  StyleSheet
} from 'react-native';
import { Text } from "react-native-elements";
import Flag from 'react-native-flags';

import { setBaseCurrency } from "../../store/actions/CurrencyActions";

class BaseCurrencyPicker extends React.Component {

  render () {
    return (
        <View style={styles.pickerStyle}>
          <Text h4 h4Style={{ fontSize: 18, paddingLeft: 5 }}>Change base currency</Text>
          <View style={styles.pickerContainer}>
            <View style={styles.flag}>
              <Flag
                  code={this.props.base.id}
                  size={32}
                  type="shiny"
              />
            </View>
            <View style={{ width: '85%' }}>
              <Picker
                  selectedValue={this.props.base.currencyId}
                  onValueChange={itemValue => this.props.setBaseCurrency(itemValue)}>
                {
                  this.props.currenciesList.map((currency, index) => {
                    return (<Picker.Item key={index} label={currency.currencyName} value={currency.currencyId}/>)
                  })
                }
              </Picker>
            </View>
          </View>
        </View>
    )
  }
}


const styles = StyleSheet.create({
  pickerStyle: {
    paddingLeft: 10,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderColor: '#F6F6F6',
    borderWidth: 0,
  },

  pickerContainer: {
    flexDirection: 'row'
  },

  flag: {
    width: '10%',
    marginTop: 9,
    paddingLeft: 5
  }
});

const mapStateToProps = state => {
  return {
    currenciesList: state.allCurrenciesList,
    base: state.baseCurrency,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setBaseCurrency: currencyId => dispatch(setBaseCurrency(currencyId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BaseCurrencyPicker);