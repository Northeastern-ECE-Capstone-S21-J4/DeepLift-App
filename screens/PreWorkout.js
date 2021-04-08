import React, { useState }  from "react";
import { View, ScrollView, StyleSheet, Text, TextInput, Keyboard, 
          TouchableWithoutFeedback, Image, Dimensions } from "react-native";
import { FontAwesome } from '@expo/vector-icons';

const PreWorkout = ({ route, navigation }) => {
  const [weight, onChangeWeight] = useState('');
  const { username, exerciseName, exerciseID } = route.params;
  const { width } = Dimensions.get('window');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView>
        <Text style={styles.title} >{exerciseName.toUpperCase()}</Text>
        {exerciseID == 1? 
        <Image style={{width: 0.8*width, height: 200, marginHorizontal: "10%", borderRadius: 25, marginTop: "5%"}} 
        source={require('../assets/1.jpg')}/> : (exerciseID == 2? <Image style={{width: 0.8*width, height: 200, marginHorizontal: "10%", borderRadius: 25, marginTop: "5%"}} 
        source={require('../assets/2.jpg')}/> : <Image style={{width: 0.8*width, height: 200, marginHorizontal: "10%", borderRadius: 25, marginTop: "5%"}} 
        source={require('../assets/3.jpg')}/>)}
        <Text style={styles.text1} >Please enter weight (lb): </Text>
        <TextInput style={styles.textField}
                  keyboardType="number-pad"
                  onChangeText={inputWeight => onChangeWeight(inputWeight)}/>
        <Text style={styles.text2} >Use mirror or phone: </Text>
        <View style={styles.bottomRow}>
          <FontAwesome.Button name="qrcode" style={styles.button} 
                                            backgroundColor="#62a4f5"
                                            onPress={() => startWorkoutOnMirror()}>
            Connect to Mirror</FontAwesome.Button>
          <FontAwesome.Button name="mobile" style={styles.button} 
                                            backgroundColor="#62a4f5"
                                            onPress={() => navigation.navigate("Home")}>
            Use Phone Camera</FontAwesome.Button>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );

  function startWorkoutOnMirror() {
    const TEMP_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoieWFqaW5nd2FuZzEwMjIiLCJleHBpcmVzIjoxNjE5ODQxNjAwLjB9.BtxFdI0uWoHyakfLSNm82QTQyBLX2wQhriRB6Ywb75k";
    const requestOptions = {
      method: 'PUT',
      headers: { 'Authorization': 'Bearer ' + TEMP_TOKEN,
      'accept': 'application/json'}
    };
  fetch(`https://api.deepliftcapstone.xyz/workouts/user/${username}/start`, requestOptions)
      .then(response => console.log(response.json()));
    navigation.navigate("QRCodePage",
                                            { username: username,
                                              exerciseName: exerciseName,
                                              exerciseID: exerciseID,
                                              weight: weight });
  }
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: '#31373b',
    fontSize: 20,
    textAlign: "center",
    marginTop: "7%"
  },
  text1: {
    fontSize: 16,
    margin: "10%",
    marginBottom: "8%"
  },
  text2: {
    fontSize: 16,
    marginTop: "10%",
    marginBottom: "8%",
    marginHorizontal: "10%",
  },
  textField: {
    marginHorizontal: "10%",
    height: "5%",
    borderBottomColor: 'gray', 
    borderBottomWidth: 1
  },
  button: {
    width: 135,
    height: 50
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
});

export default PreWorkout;