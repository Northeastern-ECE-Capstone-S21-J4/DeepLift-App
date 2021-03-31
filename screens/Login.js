import React, { Component } from 'react'
import { SafeAreaView, TextInput, Text, StyleSheet, Alert, Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { navigate } from "../navigation/RootNavigation.js";

global.session;

class LoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            pw: "",
            response: null
        }
    }

    async login() {
        session.setUserName(this.state.userName);
        session.setPW(this.state.pw);
        var loginStatusCode = await session.login();
        if(loginStatusCode == 200){
            navigate("Application");
        } else if (loginStatusCode == 403){
            alert("Error",
                  "Invalid username or password",
                  [
                      {
                          text: "OK"
                      }
                  ]);
        } else {
            alert(`Error ${loginStatusCode}`,
                  "An error occured during login",
                  [
                    {
                        text: "OK"
                    }
                  ]);
        }
    }
    
    render() {
         return (
             <SafeAreaView>
                 <TextInput
                 style={{paddingTop:10}} 
                 autoCapitalize="none"
                 placeholder="Username"
                 onChangeText={text => this.setState({userName: text})} />
                 <TextInput 
                 placeholder="Password"
                 secureTextEntry={true}
                 onChangeText={text => this.setState({pw: text})}/>
                <Button onPress={() => this.login()}
                title="Log In" />
                <Button 
                onPress={() => navigate("Signup")}
                title="Sign Up" />
             </SafeAreaView>
         )
     }
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        flexDirection: "column"
    },
    submitButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#007bff",
        marginTop: '4%',
        marginBottom: '4%',
        paddingLeft: '30%',
        paddingRight: '30%',
        borderRadius: 4
    }
})

export default LoginScreen