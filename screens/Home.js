import React, { useEffect, useState } from "react";
import { View, Button, Text, StyleSheet, ScrollView } from "react-native";
import { Auth } from 'aws-amplify';

const Home = ({ navigation }) => {

  const [exercises, setExercises] = useState([]);
  const [username, setUsername] = useState([]);
  const fetchExercises = async () => {
    const response = await fetch("https://api.deepliftcapstone.xyz/exercises");
    const exercises = await response.json();
    exercises.sort((a, b) => a.exerciseID - b.exerciseID);
    console.log(exercises);
    setExercises(exercises);
  }
  useEffect(() => {
    fetchExercises(),
    fetchUsername()
  }, [])

  const fetchUsername = async () => {
    const { attributes } = await Auth.currentAuthenticatedUser();
    const userEmail = attributes.email;
    console.log(userEmail);
    const username = userEmail.split("@");
    setUsername(username[0]);
  } 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Workout: </Text>
      <ScrollView>
      {exercises.map((exercise) => {return <Button title={exercise.exerciseName.toUpperCase()} 
                                            key={exercise.exerciseID} 
                                            style={styles.exerciseItem}
                                            color="#62a4f5"
                                            onPress={() => navigation.navigate("PreWorkout", 
                                            {username: username, exerciseName: exercise.exerciseName, 
                                            exerciseID: exercise.exerciseID})}/>})}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: '#31373b',
    fontSize: 20,
    margin: "5%"
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  exerciseItem: {
    margin: "10%",
  }
});

export default Home;