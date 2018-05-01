import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text, View, DeviceEventEmitter, NetInfo, TextInput, AppRegistry, Button, Alert, Image, AsyncStorage } from 'react-native'

const BatteryManager = require('NativeModules').BatteryManager;
const MemoryManager = require('NativeModules').MemoryManager;
const CpuLoad = require('NativeModules').CpuLoad;

let date = new Date();
let today = date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear();
let time = date.getUTCHours()+":"+date.getUTCMinutes()+":"+date.getUTCSeconds();

export class PushData extends React.Component {
  static navigationOptions = { title: "Device Health Data", headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#4682b4'
    },
  };
    constructor(props) {
        super(props)
        this.state = {
            deviceKey: null,
            lat: null,
            long: null,
            error: null,
            charging: false,
            batteryLevel: null,
            connType: null,
            eConnType: null,
            dateTime: today+", "+time,
            memStatus: null,
            cpuload: null,
        }
    }

    onBatteryStatus = (info) => {
        this.setState({batteryLevel: info.level});
        this.setState({charging: info.isPlugged})
    };

    onMemoryStatus = (memObj) => {
        this.setState({memStatus: memObj.occupiedRAM})
    };


            postData = () => {
              AsyncStorage.getItem('SecretKey')
                    .then((Key) => this.setState({deviceKey : Key}))
              fetch('http://192.168.1.130:8888/receivedata/receive/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    deviceHealth: this.state
                }),
            })
                .then(response => response.json())
                .then(response => console.warn(response))

              }


            performAction = () => {
              if (mount == true){
                handle = setInterval(this.postData, 2000)
              }else if(mount == false){
                clearInterval(handle)
              }
            }

    componentDidMount() {
        mount = true
        navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                    error: null
                });
            },
        );

        BatteryManager.updateBatteryLevel((info) => {
            this._subscription = DeviceEventEmitter.addListener('BatteryStatus', this.onBatteryStatus);
            this.setState({batteryLevel: info.level});
            this.setState({charging: info.isPlugged})
        });

        NetInfo.getConnectionInfo().then((connectionInfo) => {
            this.setState({
                connType: connectionInfo.type,
                eConnType: connectionInfo.effectiveType
            })
        });


        NetInfo.addEventListener('connectionChange', connectionInfo => {
                this.setState({
                    connType: connectionInfo.type,
                    eConnType: connectionInfo.effectiveType
                })
            }
        );

        memStatus = () => MemoryManager.updateMemoryUsage((memObj) => {
                this.setState({
                    memStatus: memObj.occupiedRAM
                })
        })

        memUsageHandle=setInterval(memStatus, 1000)

        cpuStatus = () => CpuLoad.updateCpuLoad((cpuObj) => {
            this.setState({cpuload: cpuObj.percentageCpuUtilization})
        })

        cpuHandle=setInterval(cpuStatus, 1000)

        this.performAction()
      }

    componentWillUnmount() {
        this._subscription.remove()
        clearInterval(this.memUsageHandle)
        clearInterval(this.cpuHandle)
        NetInfo.removeEventListener('connectionChange')
      }
    render() {
        let chargingText = "";
        if (this.state.charging) {
            chargingText = <Text>Charging </Text>
        } else {
            chargingText = <Text>Not Charging </Text>
        }

        return (
          <View style={{flex: 1, alignItems: 'center'}}>
          <View style={{flex: 1, width: '75%', justifyContent: 'center'}}>
            <View style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}>
            <Image
            resizeMode={'contain'}
            style={{height: '100%', width: '100%'}}
      source={{uri: 'http://www.veris.xooinc.com/wp-content/uploads/2017/05/Veris-Long-NEW-Gradient.png'}}
    />
            </View>
            <View style={{flex: 3, justifyContent:'center', alignItems:'center'}}>
                <Text>
                    Battery Level {this.state.batteryLevel+ "%"}
                </Text>
                {chargingText}
                <Text>
                    {this.state.lat}
                </Text>
                <Text>
                    {this.state.long}
                </Text>
                <Text>
                    {this.state.connType}
                </Text>
                <Text>
                    {this.state.eConnType}
                </Text>
                <Text>
                    {this.state.dateTime}
                </Text>
                <Text>
                    {this.state.memStatus+"%"}
                </Text>
                <Text>
                    {this.state.cpuload+"%"}
                </Text>
                </View>
                <View style={{flex:3, justifyContent: 'center', padding: 8}}>
                <TouchableOpacity style={styles.button} onPress= {() => {mount=false; this.performAction()}}>
                <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize: 14}}>Stop</Text>
                </TouchableOpacity>
                <Text></Text>
                <TouchableOpacity style={styles.button} onPress= {() => {mount=true; this.performAction()}}>
                <Text style={{color: '#ffffff', fontWeight: 'bold', fontSize: 14}}>Start Again</Text>
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
