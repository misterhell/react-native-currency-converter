import React, { Component } from 'react';
import { connect } from 'react-redux';

import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { ListItem, Text } from 'react-native-elements';
import Icon from "react-native-vector-icons/Ionicons";
import Flag from 'react-native-flags';
import { favoriteStateAndFilter } from "../store/actions/CurrencyActions";
import { PRIMARY_COLOR, LIGHT_GRAY } from '../constants/app-theme';

class CurrencyListItem extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      currencyId: this.props.country.currencyId
    };

    this._onPress = this._onPress.bind(this);
  }


  _onPress () {
    this.props.favoriteStateAndFilter(this.state.currencyId)
  }

  favoriteIconStyle () {
    const isFavorite = this.props.favorite.indexOf(this.props.country.currencyId) !== -1;
    return isFavorite ? styles.selectedPin : styles.unselectedPin;
  }

  render () {
    return (
        <ListItem
            containerStyle={styles.listContainer}
            leftAvatar={<Flag
                code={this.props.country.id}
                size={32}
                type="shiny"
            />}
            title={<Text style={styles.title}>{this.props.country.currencyName}</Text>}
            subtitle={<Text style={styles.subtitle}>{this.props.country.currencyId}</Text>}
            rightElement={
              <View style={styles.rightElement}>
                <Text
                    style={{ paddingRight: 5 }}>{this.props.country.currencySymbol} {this.props.country.currencyCost}</Text>
                <TouchableHighlight onPress={this._onPress} underlayColor="white">
                  <Icon style={this.favoriteIconStyle()} name='ios-star' size={20}/>
                </TouchableHighlight>
              </View>
            }
        />
    )
  }
}

const styles = StyleSheet.create({
  title: {},

  subtitle: {
    fontWeight: '500'
  },

  selectedPin: {
    color: PRIMARY_COLOR
  },
  unselectedPin: {
    color: LIGHT_GRAY
  },

  listContainer: {
    padding: 10,
    borderBottomColor: LIGHT_GRAY,
    borderBottomWidth: 1,
  },

  rightElement: {
    flexDirection: 'row'
  }
});


const mapDispatchToProps = dispatch => {
  return {
    favoriteStateAndFilter: currencyId => dispatch(favoriteStateAndFilter(currencyId)),
  }
};

const mapStateToProps = state => {
  return {
    favorite: state.favoriteCurrencies
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyListItem);