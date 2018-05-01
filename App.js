import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text, View, DeviceEventEmitter, NetInfo, TextInput, AppRegistry, Button, Alert, Image, AsyncStorage } from 'react-native'
import { StackNavigator } from 'react-navigation'
import {Registration} from "./src/register"
import {PushData} from "./src/push"
import {Login} from "./src/login"
import {Acknowledgement} from "./src/acknowledgement"
import {HomeScreen} from "./src/home"

const RootStack = StackNavigator({
    Home: {screen: HomeScreen},
    Register: {screen: Registration},
    Login: {screen: Login},
    Push: {screen: PushData},
    Acknowledgement: {screen: Acknowledgement}
},
    {initialRouteName: 'Home'})

export default class App extends React.Component {
    render() {
        return <RootStack />;
    }
}
