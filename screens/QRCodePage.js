import React, { useState }  from "react";
import { View, StyleSheet, Text, TextInput, Keyboard, TouchableWithoutFeedback, Button } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from '@expo/vector-icons';
  
const QRCodePage = ({ route, navigation }) => {
  const [difficulty, onChangeDifficulty] = useState('');
  const { username, exerciseName, exerciseID, weight } = route.params;
  const TEMP_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoieWFqaW5nd2FuZzEwMjIiLCJleHBpcmVzIjoxNjE5ODQxNjAwLjB9.BtxFdI0uWoHyakfLSNm82QTQyBLX2wQhriRB6Ywb75k";
  const QRStringValue = JSON.stringify({username: username , exerciseName: exerciseName,
    exerciseID: exerciseID, weight: weight});
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.text1} >Scan to start a workout: </Text>
        <QRCode value={QRStringValue} size={270} color="#62a4f5"/>
        <View style={styles.row}>
          <Text style={styles.text2} >Difficulty Level {"\n"}(1 easy - 10 hard): </Text>
          <TextInput style={styles.textField}
                    keyboardType="number-pad"
                    onChangeText={inputDifficulty => onChangeDifficulty(inputDifficulty)}/>
        </View>
        <Ionicons name='stop-circle-outline' size={80} color="black"
                  onPress={() => endWorkout()}/>
      </View>
    </TouchableWithoutFeedback>
  );

  function endWorkout() {
    navigation.navigate("LoadingPage");
    const requestOptions = {
      method: 'PUT',
      headers: { 'Authorization': 'Bearer ' +  TEMP_TOKEN,
      'accept': 'application/json' }
  };
  fetch(`https://api.deepliftcapstone.xyz/workouts/user/${username}/end/${difficulty}`, requestOptions)
      .then(response => console.log(response.json()));
  }
};

const styles = StyleSheet.create({
  text1: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  text2: {
    fontSize: 15,
    width: "45%",
  },
  textField: {
    width: "10%",
    borderBottomColor: 'gray', 
    borderBottomWidth: 1
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});

export default QRCodePage;