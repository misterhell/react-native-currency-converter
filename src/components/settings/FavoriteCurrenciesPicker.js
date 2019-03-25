import React, { Component } from 'react';

import {
  View
} from 'react-native';

import {
  Text
} from 'react-native-elements';


export default class FavoriteCurrenciesPicker extends React.Component {

  render () {
    return (
        <View style={{
          padding: 20,
          width: '100%',
          marginTop: this.props.top,
          marginBottom: this.props.bottom
        }}>
          <Text>Favorites</Text>
        </View>
    )
  }
}
