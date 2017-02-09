
import React, { Component } from 'react';

import { Container, Content, Text, List, ListItem, Thumbnail } from 'native-base';

import styles from './styles';

const placeholder = require('../../../img/placeholder.png');

export default class TabMake extends Component { // eslint-disable-line

  render() { // eslint-disable-line
    return (
      <Container style={styles.container}>
        <Content padder>
          <List>
            <ListItem>
              <Thumbnail source={placeholder} />
              <Text>Drink 1</Text>
              <Text note>Description</Text>
            </ListItem>
            <ListItem>
              <Thumbnail source={placeholder} />
              <Text>Drink 2</Text>
              <Text note>Description</Text>
            </ListItem>
            <ListItem>
              <Thumbnail source={placeholder} />
              <Text>Drink 3</Text>
              <Text note>Description</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
