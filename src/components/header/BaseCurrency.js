import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import { Text } from 'react-native-elements';
import Flag from 'react-native-flags';
import { connect } from "react-redux";

class BaseCurrency extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    if (this.props.base.currencyId) {
      return (
          <View style={styles.containerStyle}>
            <View style={styles.textContainer}>
              <Text h4 style={styles.text}>Base currency:</Text>
            </View>
            <View style={styles.currencyContainer}>
              <Text h4 style={styles.text}>{this.props.base.currencyId}</Text>
              <View style={styles.flag}>
                <Flag
                    code={this.props.base.id}
                    size={32}
                    type="shiny"
                />
              </View>
            </View>
          </View>
      )
    }

    return null;
  }
}


const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    padding: 5
  },

  textContainer: {
    flex: 2,
  },

  text: {
    color: 'white',
    paddingLeft: 10
  },

  currencyContainer: {
    flexDirection: 'row',
    flex: 1,
  },

  flag: {
    paddingLeft: 10
  }

});


const mapStateToProps = state => {
  return {
    base: state.baseCurrency,
  };
};

export default connect(mapStateToProps)(BaseCurrency);