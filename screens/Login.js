import React, { Component } from 'react'
import { SafeAreaView, TextInput, Text, StyleSheet, Alert  } from 'react-native'
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
            navigate("Home");
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
                 placeholder="Username"
                 onChangeText={text => this.setState({userName: text})} />
                 <TextInput 
                 placeholder="Password"
                 onChangeText={text => this.setState({pw: text})}/>
                <TouchableOpacity onPress={() => this.login()}
                style={styles.submitButton}><Text>Submit</Text></TouchableOpacity>
             </SafeAreaView>
         )
     }
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        flexDirection: "column"
    },
    previewBox: {
        flex: 3,
        backgroundColor: "black",
        color: "white"
    },
    uiBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    infoEnterBox: {
        flex: 1,
        flexDirection: "row",
        justifyContent: 'center',
        alignContent: 'center',
        paddingTop: '3%'
    },
    picker: {
        flex: 4,
        borderWidth: 2,
        borderColor: "black",
        margin: 10
    },
    repBox: {
        flex: 1,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: 'black',
        margin: 10,
        borderRadius: 4
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