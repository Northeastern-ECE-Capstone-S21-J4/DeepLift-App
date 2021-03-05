import React, { Component } from 'react'
import { SafeAreaView, TextInput, Text, StyleSheet, Alert  } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { APIHelper } from '../lib/api/api';
import { User } from '../lib/user/user';

class LoginScreen extends Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            pw: "",
            response: null
        }
    }

    setResponse(res){
        console.log(res);
        console.log(this);
        this.setState({response: res});
    }

    async login() {
        var user = new User(this.state.userName, this.state.pw);
        var apiHelper = new APIHelper("https://api.deepliftcapstone.xyz");//"http://127.0.0.1:8000");//
        var res = await apiHelper.login(user);
        if(apiHelper.checkError()){
            Alert.alert("Login Failed", "apiHelper.lastError", [ {text: "OK"}])
            console.log(apiHelper.lastError);
        } else {
            console.log(res);
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