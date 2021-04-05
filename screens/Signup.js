import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Text, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { navigate } from '../navigation/RootNavigation';

global.session;

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            firstName: "",
            lastName: "",
            bodyweight: "",
            age: "",
            email: "",
            pw: "",
            pw_confirm: ""
        }
    }

    async register() {
        var nullFlag = true
        for(let prop in this.state) {
            if(this.state[prop] == ""){
                console.log(prop);
                nullFlag = false 
            }
        }
        if(nullFlag){
            if(this.state.pw == this.state.pw_confirm){
                var userJSON = this.state
                delete userJSON["pw_confirm"]
                session.apiInstance.createUser(userJSON)
                navigate("Login");
            } else {
                alert("Error",
                      "Passwords do not match",
                      [
                          {
                              text: "OK"
                          }
                      ]);
            }
        } else {
            alert("Error",
                      "All fields are required",
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
                <View>
                    <View style={styles.group}>
                        <TextInput 
                            style={styles.firstNameBox}
                            placeholder="First Name"
                            onChangeText={text => this.setState({firstName: text})}
                        />
                        <TextInput
                            placeholder="Last Name"
                            style={styles.lastNameBox}
                            onChangeText={text => this.setState({lastName: text})}
                        />
                    </View>
                    <TextInput 
                        placeholder="Email Address"
                        style={styles.textBox}
                        autoCapitalize="none"
                        onChangeText={text => this.setState({email: text})}
                    />
                    <TextInput
                        autoCapitalize="none"
                        style={styles.textBox}
                        placeholder="Username"
                        onChangeText={text => this.setState({userName: text})}
                    />
                    <TextInput 
                        secureTextEntry={true}
                        style={styles.textBox}
                        placeholder="Password"
                        onChangeText={text => this.setState({pw: text})}
                    />
                    <TextInput
                        secureTextEntry={true}
                        style={styles.textBox}
                        placeholder="Confirm Password"
                        onChangeText={text => this.setState({pw_confirm: text})}
                    />
                    <View style={styles.group}>
                        <TextInput 
                            keyboardType="numeric"
                            placeholder="Bodyweight"
                            style={styles.weightBox}
                            onChangeText={text => this.setState({bodyweight: text})}/>
                        <TextInput 
                            keyboardType="numeric"
                            style={styles.ageBox}
                            placeholder="Age"
                            onChangeText={text => this.setState({age: text})}/>
                    </View>
                    <TouchableOpacity
                    style={styles.submitButton} 
                    onPress={() => this.register()}> 
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    area: {
        flex: 1,
        flexDirection: "column"
    },
    textBox: {
        borderWidth: 1,
        borderColor: "#AEAEB2",
        borderRadius: 5,
        margin: "2.5%",
        textAlign: "center",
        height: 30
    },
    firstNameBox: {
        borderWidth: 1,
        borderColor: "#AEAEB2",
        borderRadius: 5,
        margin: "2.5%",
        textAlign: "center",
        height: 30,
        width: "35%"
    },
    lastNameBox: {
        borderWidth: 1,
        borderColor: "#AEAEB2",
        borderRadius: 5,
        margin: "2.5%",
        textAlign: "center",
        height: 30,
        width: "55%"
    },
    weightBox: {
        borderWidth: 1,
        borderColor: "#AEAEB2",
        borderRadius: 5,
        margin: "2.5%",
        textAlign: "center",
        height: 30,
        width: "45%"
    },
    ageBox: {
        borderWidth: 1,
        borderColor: "#AEAEB2",
        borderRadius: 5,
        margin: "2.5%",
        textAlign: "center",
        height: 30,
        width: "45%"
    },
    group: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignContent: "center",
    },
    submitButton: {
        height: 40,
        marginLeft: "2.5%",
        marginRight: "2.5%",
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#62a4f5",
        borderRadius: 10
    },
    buttonText: {
        color: "#ffffff"
    }

})

export default Signup;