import React, { Component } from 'react';
import {
  View
} from 'react-native';


export default class DividerLine extends React.Component {

  render () {
    return (
        <View style={{
          borderBottomColor: '#F6F6F6',
          borderBottomWidth: 1,
          width: '100%',
          marginTop: this.props.top,
          marginBottom: this.props.bottom
        }} />
    )
  }
}
