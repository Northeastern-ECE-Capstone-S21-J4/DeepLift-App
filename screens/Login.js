import { withSSRContext } from 'aws-amplify';
import React, { Component } from 'react'
import { SafeAreaView, TextInput, StyleSheet, TouchableOpacity, Text, View, ImageBackground, Dimensions } from 'react-native'
import { navigate } from "../navigation/RootNavigation.js";
import bgImage from '../assets/Login_BG.jpg';

global.session;

class LoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            pw: ""
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
             <SafeAreaView style={styles.area}>
                 <ImageBackground source={bgImage} style={styles.bgImage}>
                    <View style={styles.uiBox}>
                        <TextInput
                        style={styles.textBox} 
                        autoCapitalize="none"
                        placeholder="Username"
                        placeholderTextColor="#f2f2f2"
                        onChangeText={text => this.setState({userName: text})} />
                        <TextInput 
                        style={styles.textBox}
                        placeholder="Password"
                        placeholderTextColor="#f2f2f2"
                        secureTextEntry={true}
                        onChangeText={text => this.setState({pw: text})}/>
                        <View style={styles.buttonsBox}>
                            <TouchableOpacity 
                            style={styles.loginButton}
                            onPress={() => this.login()}>
                                <Text style={styles.loginButtonText}>Log In</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            style={styles.signUpButton}
                            onPress={() => navigate("Signup")}>
                                <Text style={styles.signUpButtonText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                 </ImageBackground>
             </SafeAreaView>
         )
     }
}

const styles = StyleSheet.create({
    area: {
        flexDirection: "column",
    },
    uiBox: {
        flex: 1,
        paddingTop: "50%",
        paddingBottom: "50%",
        flexDirection: "column",
        alignContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    textBox: {
        borderWidth: 2,
        borderColor: "#f2f2f2",
        borderRadius: 5,
        margin: "2.5%",
        textAlign: "center",
        color: "#f2f2f2"
    },
    buttonsBox: {
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        height: 40
    },
    loginButton: {
        width: "45%",
        marginLeft: "2.5%",
        marginRight: "2.5%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#62a4f5",
        borderRadius: 10
    },
    signUpButton: {
        width: "45%",
        marginLeft: "2.5%",
        marginRight: "2.5%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderColor: "#62a4f5",
        borderRadius: 10,
        borderWidth: 2
    },
    loginButtonText: {
        color: "#f2f2f2"
    },
    signUpButtonText: {
        color: "#62a4f5"
    },
    bgImage: {
        height: Dimensions.get('window').height,
    }
})

export default LoginScreen