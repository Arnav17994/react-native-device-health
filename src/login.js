import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text, View, DeviceEventEmitter, NetInfo, TextInput, AppRegistry, Button, Alert, Image, AsyncStorage } from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'

export class Login extends React.Component {
  static navigationOptions = { title: "Login", headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#4682b4'
    },
  };
    constructor(props){
      super(props)
      this.state={
        uname: '',
        pword: ''
      }
    }

proceed = () => {
      if ( this.state.uname == 'admin' &&  this.state.pword == 'admin') {
        this.props.navigation.navigate('Push')
      }
      else {
        Alert.alert(
'Login Unsuccessful',
'Incorrect login details. Please retry.',
[
{text: 'OK', onPress: () => this.props.navigation.navigate('Login')},
],
{ cancelable: false })
}
}

    render(){
      return(
        <View style={{flex:1, alignItems: 'center'}}>
        <View style={{flex: 1, width: '75%',}}>
        <View style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}>
        <Image
        resizeMode={'contain'}
        style={{height: '100%', width: '100%'}}
  source={{uri: 'http://www.veris.xooinc.com/wp-content/uploads/2017/05/Veris-Long-NEW-Gradient.png'}}
/>
        </View>
        <View style={{flex: 3}}>
        <Text>Username</Text>
        <TextInput value={this.state.uname} onChangeText={(text)=>this.setState({uname: text})} />
        <Text> </Text>
        <Text>Password</Text>
        <TextInput secureTextEntry={true} value={this.state.pword} onChangeText={(text)=>this.setState({pword: text})} />
        </View>
        <View style={{flex: 3, justifyContent: 'center'}}>
        <TouchableOpacity style={styles.button} onPress={this.proceed}>
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
