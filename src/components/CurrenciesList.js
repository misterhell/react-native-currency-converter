import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View
} from 'react-native';

import CurrencyListItem from './CurrencyListItem';

class CurrenciesList extends React.Component {

  render () {
    return (
        <View>
          {
            this.props.currenciesList.map((el, i) => (
                <CurrencyListItem key={el.id} country={el}/>
            ))
          }
        </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    currenciesList: state.filteredCurrencies,
  };
};

export default connect(mapStateToProps)(CurrenciesList);