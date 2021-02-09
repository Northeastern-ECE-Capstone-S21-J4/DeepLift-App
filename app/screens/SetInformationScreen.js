import React, { Component } from 'react'
import { SafeAreaView, Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'

export default class SetInformationScreen extends Component {
    state = {
        exercise: 'Squat',
        reps: '0'
    };

    handleReps = (text) => {
        if (text.charAt(0) == '0') {
            this.setState({ reps: text.substring(1)})
            return;
        }
        this.setState({ reps: text })
    };

    //TODO: previewBox will display a preview of the recorded workout
    render() {
        return (
            <SafeAreaView style={styles.area}>
                <View style={styles.previewBox}></View>
                <View style={styles.uiBox}>
                    <View style={styles.infoEnterBox}>
                        <Picker 
                            selectedValue={this.state.exercise}
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({exercise: itemValue})
                            }>
                            <Picker.Item label="Squats" value="Squats"/>
                            <Picker.Item label="Bench Press" value="Bench Press"/>
                            <Picker.Item label="Dead Lifts" value="Dead Lifts"/>
                        </Picker>
                        <TextInput 
                            keyboardType="numeric"
                            style={styles.repBox}
                            value={this.state.reps}
                            onChangeText={this.handleReps}/>
                    </View>
                    <TouchableOpacity
                        style={styles.submitButton}>
                        <Text style={{color: "white"}}>Save Exercise</Text>
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
        flex: 1,
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

