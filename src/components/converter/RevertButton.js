import React, { Component } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import { Button, Icon } from "react-native-elements";

class RevertButton extends React.Component {

  render () {
    return (
        <View style={styles.revertButtonContainer}>
          <Button
              type="clear"
              onPress={this.props.onPress}
              icon={
                <Icon
                    style={styles.icon}
                    name="cached"
                    size={30}
                    color="#00aced"
                />
              }
          />
        </View>
    )
  }
}


const styles = StyleSheet.create({
  revertButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: "flex-start",
  },

  icon: {

  }
});


export default RevertButton;