
import React, { Component } from 'react';
import { ToastAndroid, TextInput, Alert, View, StyleSheet, ListView, Text, TouchableHighlight, RefreshControl} from 'react-native';
import { connect } from 'react-redux';

// import { actions } from 'react-native-navigation-redux-helpers';
import { Header, Title, Content, Button, Icon } from 'native-base';

import navigateTo from '../../actions/pageNav'
import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ActionButton from 'react-native-action-button';
import store from 'react-native-simple-store';

var filter = require('lodash/filter');

class Recipes extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      isGuest: true,
      refreshing: false,
      dataSource: ds.cloneWithRows([]),
      searchText: "",
      isLoading: false,
      empty: false,
      rawData: [],
    };
  }

  static propTypes = {
    openDrawer: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    }),
    navigateTo: React.PropTypes.func,
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'recipes');
  }

  componentWillReceiveProps() {
    // console.warn("willProps");
    this.fetchData();
  }

  componentWillMount() {
    // console.warn("willMount");
    this.fetchData();
  }

  componentDidMount() {
    // console.warn("didMount");
  }



  showServerErrorAlert(response) {
    Alert.alert(
      "Server Error",
      "Got response: " + response.status + " " + response.statusText,
      [
      {text: 'Dismiss', style: 'cancel'}
      ],
      { cancelable: true }
      );
  }

  getData() {
    store.get('recipes').then((data) => {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(data),
        isLoading: false,
        empty: false,
        rawData: data,
      });
    }).catch(error => {
      console.warn("error getting the recipe list from the local store");
      this.setState({
        empty: true,
        isLoading: false,
      });
    });
  }

  fetchData() {
    store.get('account').then((data) => {
      this.setState({
        username: data.userInfo.username,
        isGuest: data.isGuest,
      });

      fetch('https://activitize.net/mixbook/recipe/getAllRecipes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(async (response) => {
        if (response.status == 200) {
          var json = await response.json();
        // console.warn(json[0]);
        store.save("recipe", json).catch(error => {
          console.warn("error storing the recipe list into the local store");
        });
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(json),
          isLoading: false,
          empty: false,
          rawData: json,
        });
        return json;
        } else {
          this.showServerErrorAlert(response);
          return;
        }
      }).catch((error) => {
        console.error(error);
        this.setState({
          empty: true,
          isLoading: false,
        });
      });
    }).catch((error) => {
      console.warn("error getting user token from local store");
    });
  }


  setSearchText(event) {
    let searchText = event.nativeEvent.text;
    this.setState({searchText});

    let filteredData = this.filterItems(searchText, this.state.rawData);
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(filteredData),
    });
  }

  filterItems(searchText, items) {
    let text = searchText.toLowerCase();
    return filter(items, (n) => {
      let item = n[1].toLowerCase();
      return item.search(text) !== -1;
    });
  }


  onListItemRemove(item: string) {
    // Delete the ingredient from the server
    store.get('account').then((data) => {
      fetch('https://activitize.net/mixbook/recipe/deleteRecipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': data.token,
        },
        body: JSON.stringify({
          recipeId: item[0]
        })
      }).then((response) => {
        if (response.status == 200) {
          ToastAndroid.show("Recipe removed", ToastAndroid.SHORT);
          this.fetchData();
          console.log("recipe list pushed successfully");
        } else {
          this.showServerErrorAlert(response);
          return;
        }
      }).catch((error) => {
        console.error(error);
      });
    }).catch((error) => {
      console.warn("error getting user token from local store");
      console.warn(error);
    });
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.fetchData();
    this.setState({refreshing: false});
  }

  _pressRow(item: string) {
    if (this.state.isGuest || item[7] !== this.state.username) {
      Alert.alert(
        "Edit " + item[1],
        'What do you want to do?',
        [
          {text: 'Review', onPress: () => this.goToReviewPage(item)},
          {text: 'Cancel', style: 'cancel'},
        ],
        { cancelable: true }
      )
    } else {
      Alert.alert(
        item[1],
        'What do you want to do?',
        [
          {text: 'Details', onPress: () => this.goToReviewPage(item)},
          {text: 'Delete', onPress: () => this.onListItemRemove(item)},
          {text: 'Cancel', style: 'cancel'},
        ],
        { cancelable: true }
      )
    }
  }

  goToReviewPage(item: string) {
    //this.props.navigator.push({name:'review', data:item});
    global.recipeName = item[1];
    global.recipeId = item[0];
    global.directions = item[2];
    global.reviewOwner = item[7];

    //console.warn(global.recipeName);
    this.navigateTo('review');
  }

  _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    );
  }


  _renderFAB() {
    if (!this.state.isGuest) {
      return (
        <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => this.navigateTo('addRecipe')}
        />
      );
    }
  }


  render() { // eslint-disable-line
    return (

      <View style={styles.container}>
        <Header>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>

          <Title>Recipes</Title>

          <Button transparent onPress={() => this._onRefresh()}>
            <Icon name="ios-refresh" />
          </Button>
        </Header>

        <TextInput
          style={styles.searchBar}
          placeholder="Search Recipes"
          value={this.state.searchText}
          onChange={this.setSearchText.bind(this)}
          multiline={false}
          autoFocus={false}
          returnKeyType='done'
          autoCorrect={false}
        />

        <ListView
          enableEmptySections={true}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          dataSource={this.state.dataSource}
          renderRow={(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) =>
            <TouchableHighlight onPress={() => {
              this._pressRow(rowData);
              // highlightRow(sectionID, rowID);
            }}>
              <View>
                <View style={styles.row}>
                  <Text style={styles.rowText}>
                    {rowData[1]}
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          }
          renderSeparator={this._renderSeparator}
        />
        {this._renderFAB()}
      </View>
    );
  }
}


function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(Recipes);
