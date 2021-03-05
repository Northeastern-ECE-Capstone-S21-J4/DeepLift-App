import React, { useEffect, useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";

const Home = ({ navigation }) => {

  const [exercises, setExercises] = useState([]);
  const fetchExercises = async () => {
    const response = await fetch("https://api.deepliftcapstone.xyz/exercises");
    const exercises = await response.json();
    exercises.sort((a, b) => a.exerciseID - b.exerciseID);
    console.log(exercises);
    setExercises(exercises);
  }
  useEffect(() => {
    fetchExercises()
  }, [])
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Workout: </Text>
      <View>
      {exercises.map((exercise) => {return <Button title={exercise.exerciseName} 
                                            key={exercise.exerciseID} 
                                            style={styles.exerciseItem}
                                            color="#62a4f5"
                                            onPress={() => navigation.navigate("About")}/>})}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: '#31373b',
    fontSize: 20,
    margin: 20
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  exerciseItem: {
  }
});

export default Home;