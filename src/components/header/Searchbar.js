import React from 'react'
import { StyleSheet } from 'react-native'
import { SearchBar } from 'react-native-elements';

import { PRIMARY_COLOR } from '../../constants/app-theme'

export default class Search extends React.Component {
  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
        <SearchBar inputStyle={styles.searchBarInput}
                   inputContainerStyle={styles.searchBarInput}
                   containerStyle={styles.searchBarContainer}
                   placeholder="Start typing to find currency"
                   onChangeText={this.updateSearch}
                   value={search}
                   cancelIcon
        />
    );
  }
}

const styles = StyleSheet.create({
  searchBarContainer: {
    width: '100%',
    height: 60,
    backgroundColor: PRIMARY_COLOR,
    borderWidth: 0,
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent'
  },

  searchBarInput: {
    backgroundColor: 'white'
  }
});
