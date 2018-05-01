import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text, View, DeviceEventEmitter, NetInfo, TextInput, AppRegistry, Button, Alert, Image, AsyncStorage } from 'react-native'

export class HomeScreen extends React.Component {
  static navigationOptions = { header: null };
  constructor(props) {
    super(props)
  }
  render(){
    return(
      <View style={{flex:1, alignItems: 'center'}}>
      <View style={{flex: 1, width: '75%'}}>
      <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
      <Image
      resizeMode={'contain'}
      style={{height: '100%', width: '100%'}}
source={{uri: 'http://www.veris.xooinc.com/wp-content/uploads/2017/05/Veris-Long-NEW-Gradient.png'}}
/>
      </View>
      <View style={{flex: 2, padding: 10}}>
      <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Register')}>
      <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize: 14}}>Register</Text>
      </TouchableOpacity>
      <Text> </Text>
      <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Login')}>
      <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize: 14}}>Login</Text>
      </TouchableOpacity>
      </View>
      </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  button: {
alignItems: 'center',
backgroundColor: '#4682b4',
padding: 10,
borderRadius: 5
}
})
