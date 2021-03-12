import React, { useState }  from "react";
import { View, StyleSheet, Text, TextInput, Keyboard, TouchableWithoutFeedback } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import { Ionicons } from '@expo/vector-icons';
  
const QRCodePage = ({ navigation }) => {
  const [Difficulty, onChangeDifficulty] = useState('');
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.text1} >Scan to start a workout: </Text>
        <QRCode value={"{data: DeepLift is the best}"} size={200} color="#62a4f5"/>
        <View style={styles.row}>
          <Text style={styles.text2} >Difficulty Level {"\n"}(1 easy - 10 hard): </Text>
          <TextInput style={styles.textField}
                    keyboardType="number-pad"
                    onChangeText={inputDifficulty => onChangeDifficulty(inputDifficulty)}/>
        </View>
        <Ionicons name='stop-circle-outline' size={50} color="black"
                  onLongPress={() => navigation.navigate("PastWorkouts")}/>
      </View>
    </TouchableWithoutFeedback>
  );
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