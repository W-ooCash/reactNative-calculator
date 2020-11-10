import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class Field extends Component {
  constructor() {
    super();
    this.state = {
      
    };
  }

  render() {
    return (  
    <View>
      <Text>{this.props.data}</Text>
    </View>
    );
  }
}

export default Field;
