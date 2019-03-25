import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  Picker,
  StyleSheet
} from 'react-native';

import {
  Text
} from 'react-native-elements';

class CurrencyPicker extends React.Component {
  constructor (props) {
    super(props);

  }

  pickerItemLabel (currency) {
    return `${currency.currencyId} ${currency.currencyName}`;
  }


  componentWillReceiveProps (nextProps, nextContext) {
    if (this.props.selected === null && nextProps.currencies.length ) {
      this.props.onChange(nextProps.currencies[0].currencyId);
    }
  }


  render () {
    return (
        <Picker
            selectedValue={this.props.selected}
            style={{ height: 50, width: 120 }}
            mode='modal'
            onValueChange={this.props.onChange}>
          {
            this.props.currencies
                .map(currency => (
                        <Picker.Item key={currency.currencyId}
                                     label={this.pickerItemLabel(currency)}
                                     value={currency.currencyId}/>
                    )
                )
          }
        </Picker>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {}
});

const mapStateToProps = state => {
  return {
    currencies: state.allCurrenciesList,
  };
};

export default connect(mapStateToProps)(CurrencyPicker);