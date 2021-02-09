import React, { Component } from 'react'
import { SafeAreaView, Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { Picker } from '@react-native-picker/picker'

export default class SetInformationScreen extends Component {
    state = {
        exercise: 'Squat',
        reps: '0'
    };

    reps = (text) => {
        this.setState({ reps: text })
    };

    render() {
        return (
            <SafeAreaView>
                <View style={{flex: 1}}>
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
                    <TouchableOpacity
                        style={styles.submitButton}>
                        <Text>Submit</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    previewBox: {
        flex: 1,
        backgroundColor: "black",
        color: "white"
    },
    picker: {
        flex: 1,
        width: '100%'
    },
    repBox: {
        flex: 1,
        width: '100%'
    },
    submitButton: {
        flex: 1,
        width: '100%'
    }
})

