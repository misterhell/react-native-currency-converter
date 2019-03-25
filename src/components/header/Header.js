import React from 'react'
import { Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons";
import { View } from "react-native";
import { Text } from "react-native-elements";

const deviceWidth = Dimensions.get("window").width;


export class MenuButton extends React.Component {
  render () {
    return (
        <TouchableOpacity onPress={this.props.onPress}><Icon name="md-menu" size={30} style={{
          color: 'black',
          paddingLeft: 10
        }}/></TouchableOpacity>
    );
  }
}

export class HeaderTitle extends React.Component {
  render () {
    return (
        <View style={styles.container}>
          <Icon name={this.props.icon} size={25} style={styles.text}/><Text h4 style={styles.text}> {this.props.title}</Text>
        </View>
    )
  }
}


const styles = StyleSheet.create({
  text: {
    color: 'white'
  },
  container: {
    paddingLeft: 15,
    flexDirection: 'row'
  }
});