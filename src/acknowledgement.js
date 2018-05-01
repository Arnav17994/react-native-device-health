import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text, View, DeviceEventEmitter, NetInfo, TextInput, AppRegistry, Button, Alert, Image, AsyncStorage } from 'react-native'

export class Acknowledgement extends React.Component{
  static navigationOptions = { title: "Registered", headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#4682b4'
    },
  };
    constructor(props){
      super(props)
    }
    render(){
      return(
        <View style={{flex:1, alignItems: 'center'}}>
        <View style={{flex: 1, width: '75%'}}>
        <View style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}>
        <Image
        resizeMode={'contain'}
        style={{height: '100%', width: '100%'}}
  source={{uri: 'http://www.veris.xooinc.com/wp-content/uploads/2017/05/Veris-Long-NEW-Gradient.png'}}
/>
        </View>
        <View style={{flex:3, justifyContent: 'center', alignItems: 'center'}}>
        <Text>
        Your device was successfully registered.
        </Text>
        </View>
        <View style={{flex:3, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Home')}>
        <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize: 14}}>Go Back</Text>
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
