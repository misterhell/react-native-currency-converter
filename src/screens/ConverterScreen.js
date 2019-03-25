import { View, Text, StyleSheet } from "react-native";
import React, { Component } from "react";
import { Input, Button, Icon, Divider } from 'react-native-elements';
import { connect } from 'react-redux';

import RevertButton from '../components/converter/RevertButton';
import CurrencyPicker from '../components/converter/CurrencyPicker';
import Api from '../api/CurrencyAPI';

class ConverterScreen extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      from: {
        currency: this.props.base,
        count: '1'
      },
      to: {
        currency: null,
        count: ''
      }
    };

    this._revertCurrencies = this._revertCurrencies.bind(this);
    this._changeFirstCurrency = this._changeFirstCurrency.bind(this);
    this._changeSecondCurrency = this._changeSecondCurrency.bind(this);
    this.convertCurrencies = this.convertCurrencies.bind(this);
    this.onInput = this.onInput.bind(this);
  }


  componentWillMount () {
    console.log(this.state)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.hasOwnProperty('base')) {
      const from = this.state.from;
      from.currency = nextProps.base.currencyId;
      this.setState({ from: from });
    }
  }

  _revertCurrencies () {
    const from = this.state.to,
          to   = this.state.from;

    from.count = '1';
    to.count = '';

    this.setState({
      from: from,
      to: to,
    });
  }

  _changeFirstCurrency (currId) {
    this.setState({ from: { currency: currId } })
  }

  _changeSecondCurrency (currId) {
    this.setState({ to: { currency: currId } })
  }

  convertCurrencies () {
    this.beforeConvert()
        .then(() => {
          const currencyPair = this.state.from.currency + '_' + this.state.to.currency;

          Api.convertCurrencies([currencyPair])
              .then((resp) => {
                console.log(resp);

                const to     = this.state.to,
                      result = this.state.from.count * resp.data[currencyPair];

                to.count = result.toString();
                this.setState({ to: to })
              });
        })
  }

  beforeConvert () {
    const empty = /^$‍/;
    if (empty.test(this.state.from.count)) {
      this.setState({
        from: {
          currency: this.state.from.currency,
          count: '1'
        }
      });
    }

    return Promise.resolve();
  }

  onInput (text) {
    let onlyNum  = /(^\d+\.?\d*$)|(^$)/,
        isNumber = onlyNum.test(text),
        from     = this.state.from;

    if (isNumber) {
      from.count = text;
      this.setState({ from: from });
    }
  }

  render () {
    return (
        <View style={styles.container}>
          <Text style={styles.headline}>Convert currencies</Text>

          <View style={styles.converterContainer}>
            <View style={styles.inputsContainer}>
              <Input value={this.state.from.count}
                     containerStyle={styles.fromInput}
                     leftIcon={
                       <View>
                         <Text>From:</Text>
                         <CurrencyPicker onChange={this._changeFirstCurrency}
                                         selected={this.state.from.currency}/>
                       </View>
                     }
                     onChangeText={(text) => this.onInput(text)}
              />

              <Input value={this.state.to.count}
                     containerStyle={styles.toInput}
                     editable={false}
                     leftIcon={
                       <View>
                         <Text>To:</Text>
                         <CurrencyPicker onChange={this._changeSecondCurrency}
                                         selected={this.state.to.currency}/>
                       </View>

                     }/>

            </View>
            <View style={styles.revertButtonContainer}>
              <RevertButton onPress={this._revertCurrencies}/>
            </View>
          </View>


          <View>
            <Button
                onPress={this.convertCurrencies}
                title="Convert"
            />
          </View>


        </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  currencyName: {
    fontSize: 20,
    fontWeight: '500',
  },

  headline: {
    fontSize: 28,
    marginBottom: 60
  },


  inputsContainer: {
    width: '85%',
    alignSelf: 'flex-start'
  },

  revertButtonContainer: {
    width: '15%',
    alignSelf: 'center'
  },

  fromInput: {
    marginBottom: 20
  },

  toInput: {
    marginBottom: 30
  },

  converterContainer: {
    display: 'flex',
    flexDirection: 'row'
  }
});



const mapStateToProps = state => {
  return {
    base: state.baseCurrency,
  };
};

export default connect(mapStateToProps)(ConverterScreen);


