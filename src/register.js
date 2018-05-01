import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text, View, DeviceEventEmitter, NetInfo, TextInput, AppRegistry, Button, Alert, Image, AsyncStorage } from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import DatePicker from 'react-native-datepicker'

export class Registration extends React.Component{
  static navigationOptions = { title: "Register", headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#4682b4'
    },
  };
    constructor(props){
        super(props)
        this.state = {
          deviceId: "",
          password:"",
          deviceModel: "",
          deviceLocation: "",
          date:"2018-01-01"
          }
        }
          registerDevice = () => {
            fetch('http://192.168.1.130:8888/registration/register/', {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  regDetails: this.state
              })
          }).then(response => response.json())
            .then(response => AsyncStorage.setItem('SecretKey', response.Key))
          //   .then(data => AsyncStorage.getItem('SecretKey'))
          // .then(data => console.warn(data))
        }

    render(){
        return(
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <KeyboardAwareScrollView contentContainerStyle={{width: '75%', flex: 1, justifyContent: 'center'}} resetScrollToCoords={{ x: 0, y: 0 }} scrollEnabled={true} >
          <View style={{flex:1.33, height: '20%'}}>
          <Image
          resizeMode={'contain'}
          style={{height: '100%', width: '100%'}}
    source={{uri: 'http://www.veris.xooinc.com/wp-content/uploads/2017/05/Veris-Long-NEW-Gradient.png'}}
  />
          </View>
          <View style={{flex:4}}>
          <Text>Device ID</Text>
          <TextInput onChangeText={(text) => this.setState({deviceId: text})} value={this.state.deviceId} />
          <Text>Device Model</Text>
          <TextInput onChangeText={(text) => this.setState({deviceModel: text})} value={this.state.deviceModel} />
          <Text>Location</Text>
          <TextInput onChangeText={(text) => this.setState({deviceLocation: text})} value={this.state.deviceLocation} />
          <View style={{alignItems: 'center', padding: 10}}>
          <DatePicker
        style={{width: 200}}
        date={this.state.date}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        minDate="2018-01-01"
        maxDate="2021-01-01"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36,
          }
        }}
        onDateChange={(date) => {this.setState({date: date})}}
      />
          <Text></Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={this.registerDevice}>
            <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize: 14}}>Register</Text>
          </TouchableOpacity>
          </View>
          </KeyboardAwareScrollView>
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
