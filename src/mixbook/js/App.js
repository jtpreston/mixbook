
import React, { Component } from 'react';
import { StyleSheet, AsyncStorage, Alert } from 'react-native';

import { Container, Content, Text, View } from 'native-base';
import Modal from 'react-native-modalbox';

import AppNavigator from './AppNavigator';
import store from 'react-native-simple-store';

import theme from './themes/base-theme';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { };
    this.setupAsyncStore();
  }


  setupAsyncStore() {
    // Setup account store
    store.get('account').then((data) => {
      if (data == null) {
        store.save('account', {
          isLoggedIn: false,
          isGuest: false,
          userInfo: {}
        }).catch(error => {
          console.warn("error getting account key from store");
        });
      }
    }).catch(error => {
      console.warn("error getting account key from store");
    });

    // Setup settings store
    store.get('settings').then((data) => {
      if (data == null) {
        store.save('settings', {
          doStuff: true
        }).catch(error => {
          console.warn("error getting account key from store");
        });
      }
    }).catch(error => {
      console.warn("error getting account key from store");
    });

    // Setup recipes store
    /*store.save('recipes', {
      recipeList: ['Rum & Coke', 'Screwdriver'],
    })*/
    store.get('recipes').then((data) => {
      if (data == null) {
        store.save('recipes', [ ]).catch(error => {
          console.warn("error getting recipes key from store");
        });
      }
    }).catch(error => {
      console.warn("error getting recipes key from store");
    });

    // Setup alcohol list
    /*store.save('alcohol', [
        {name: "McCormicks", type: "Vodka", proof: 80},
        {name: "Seagreams", type: "Gin", proof: 76}
    ]);*/
    store.get('alcohol').then((data) => {
      if (data == null) {
        store.save('alcohol', [ ]).catch(error => {
          console.warn("error getting alcohol key from store");
        });
      }
    }).catch(error => {
      console.warn("error getting alcohol key from store");
    });

    // Setup mixer list
    /*store.save('mixers', [
        {brand: "Red Bull", name: "Energy Drink", type: "Soda"},
        {brand: "Tropicana", name: "Orange Juice", type: "Juice"}
    ]);*/
    store.get('mixers').then((data) => {
      if (data == null) {
        store.save('mixers', [ ]).catch(error => {
          console.warn("error getting mixers key from store");
        });
      }
    }).catch(error => {
      console.warn("error getting mixers key from store");
    });

    store.get('inventory').then((data) => {
      if (data == null) {
        store.save('inventory', ["Refresh to get inventory"])
        .catch(error => {
          console.warn("error getting inventory key from store");
        });
      }
    }).catch(error => {
      console.warn("error getting inventory key from store");
    });

    store.get('brands').then((data) => {
      if (data == null) {
        store.save('brands', ["Refresh to get brands"])
        .catch(error => {
          console.warn("error getting brands key from store");
        });
      }
    }).catch(error => {
      console.warn("error getting brands key from store");
    });

  }


  render() {
    return <AppNavigator />;
  }
}

export default App;
