import { StatusBar } from 'expo-status-bar';
import React, { Component, useState } from 'react';
import { DynamicColorIOS, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import Field from './Field'

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      field: '',
      evalField: ''
    }
  }

  equalFunction(){
    let lastChar = this.state.field.split('')
    let char = lastChar.pop()
    const equalText = this.state.field
    if (char == '/' || char == '*' || char == '-' || char == '+'){
      this.setState({
        evalField: 'Error'
      })
    } else {
      this.setState({
        evalField: eval(equalText)
      })
    }
    

  }

  topOnPress(char){
    if (char == '='){
      return this.equalFunction()
    }
    
    this.setState({
      field: this.state.field+char
    })
  }
  
  operation(operator){
    let lastChar = this.state.field.split('')
    if (operator == 'C'){
      lastChar.pop()
      this.setState({
        field: lastChar.join('')
      })
    } else if (operator == '/' || operator == '*' || operator == '-' || operator == '+'){
      let char = lastChar.pop()
      if (char == '/' || char == '*' || char == '-' || char == '+') return
      if (this.state.field == '') return
      this.setState({
          field: this.state.field + operator
      })
    }
  }

  render(){
  
  const top = [] 
  const numbers = [[1,2,3],[4,5,6],[7,8,9],['.',0,'=']]
  for (let x=0;x<4;x++){
    let row = []
    for (let y=0;y<3;y++){
      row.push(
        <TouchableOpacity style={styles.top} onPress={()=>this.topOnPress(numbers[x][y])} >      
          <Text style={styles.topText}>{numbers[x][y]}</Text>
        </TouchableOpacity>
      )
    }
    top.push(
      <View style={styles.row}>{row}</View>
    )
  }

  const operators = ['C','/','*','-','+']
  const topo = []
  for (let x=0;x<5;x++){
    topo.push(
      <TouchableOpacity style={styles.top} onPress={()=>this.operation(operators[x])}>          
        <Text style={styles.topText}>{operators[x]}</Text>
      </TouchableOpacity>
    )
  }

  return (
  <View style={styles.main}>
    <View style={styles.action}>
      <Text style={styles.actionText}><Field data={this.state.field}/></Text>
    </View>
    <View style={styles.equal}>
      <Text style={styles.equalText}><Field data={this.state.evalField}/></Text>
    </View>
    <View style={styles.chars}>
      <View style={styles.digits}>
        {top}
      </View>
      <View style={styles.operations}>
        {topo}
      </View>
    </View>
  </View>
  );
}}

const styles = StyleSheet.create({
  main: {flex: 1},
  action: { flex: 2, backgroundColor: 'lightblue', justifyContent: 'center', alignItems: 'flex-end'},
  actionText: { fontSize: 80},
  equal: { flex: 1, backgroundColor: 'lightblue', justifyContent: 'center', alignItems: 'flex-end'},
  equalText: { fontSize: 60},

  top: { flex: 1, alignItems: 'center', justifyContent: 'center'},
  topText: { fontSize: 48 },

  chars: { flex: 7, flexDirection: 'row'},
  row: { flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center'},
  digits: { flex:3  , backgroundColor: 'grey'},
  operations: { flex: 1, backgroundColor: 'lightgrey', justifyContent: 'space-around', alignItems: 'center'},
});
