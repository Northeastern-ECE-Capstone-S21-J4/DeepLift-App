import React, { Component } from 'react'
import { SafeAreaView, TextInput, Button, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class LoginScreen extends Component {
    state = {
        userName: "",
        pw: ""
    }

    login = () => {
        console.log("this.state");
    }
    
    render() {
         return (
             <SafeAreaView>
                 <TextInput 
                 placeholder="Username"
                 onChangeText={text => this.setState({userName: text})} />
                 <TextInput 
                 placeholder="Password"
                 onChangeText={text => this.setState({pw: text})}/>
                 <TouchableOpacity onClick={this.login()}><Text>Submit</Text></TouchableOpacity>
             </SafeAreaView>
         )
     }
}