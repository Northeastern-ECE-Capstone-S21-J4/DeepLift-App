import React, { useEffect, useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";

global.session;

const Home = ({ navigation }) => {

  const [exercises, setExercises] = useState([]);
  const username = session.user.userName;

  const fetchExercises = async () => {
    const exercises = await session.apiInstance.getExercises();
    setExercises(exercises);
  }
  useEffect(() => {
    fetchExercises()
  }, [])
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Workout: </Text>
      <View>
      {exercises.map((exercise) => {return <Button title={exercise.exerciseName.toUpperCase()} 
                                            key={exercise.exerciseID} 
                                            style={styles.exerciseItem}
                                            color="#62a4f5"
                                            onPress={() => navigation.navigate("PreWorkout", 
                                            {username: username, exerciseName: exercise.exerciseName, 
                                            exerciseID: exercise.exerciseID})}/>})}
      </View>
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