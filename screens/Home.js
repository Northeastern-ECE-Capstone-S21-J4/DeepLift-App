import React, { useEffect, useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { APIHelper } from "../lib/api/api";

const Home = ({ navigation }) => {

  const [exercises, setExercises] = useState([]);
  const fetchExercises = async () => {
    // const response = await fetch("https://api.deepliftcapstone.xyz/exercises");
    var apiHelper = new APIHelper("https://api.deepliftcapstone.xyz");
    const exercises = await apiHelper.getExercises();
    // exercises.sort((a, b) => a.exerciseID - b.exerciseID);
    console.log(exercises);
    setExercises(exercises);
  }
  useEffect(() => {
    fetchExercises()
  }, [])
  
  return (
    <View style={styles.container}>
      {exercises.map((exercise) => {return <Button title={exercise.exerciseName} 
                                            key={exercise.exerciseID} 
                                            style={styles.exerciseButton}
                                            onPress={() => navigation.navigate("About")}/>})}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  exerciseButton: {
    color: '#9AC4F8'
  }
});

export default Home;