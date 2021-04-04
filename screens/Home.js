import React, { useEffect, useState } from "react";
import { View, Button, Text, StyleSheet, ScrollView, Dimensions, Image } from "react-native";

global.session;

const Home = ({ navigation }) => {

  const { width } = Dimensions.get('window');
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
      <ScrollView>
      {exercises.map((exercise, index) => {
        if (index == 0) {
          return <View key={1}>
          <Image style={{width: 0.8*width, height: 200, marginHorizontal: "10%", borderRadius: 25}} 
          source={require('../assets/1.jpg')}/>
          <Button title={exercise.exerciseName.toUpperCase()} 
          key={exercise.exerciseID} 
          style={styles.exerciseItem}
          color="#62a4f5"
          onPress={() => navigation.navigate("PreWorkout", 
          {username: username, exerciseName: exercise.exerciseName, 
          exerciseID: exercise.exerciseID})}/>
          </View>}
          else if (index == 1) {
            return <View key={2}>
          <Image style={{width: 0.8*width, height: 200, marginHorizontal: "10%", borderRadius: 25}} 
          source={require('../assets/2.jpg')}/>
          <Button title={exercise.exerciseName.toUpperCase()} 
          key={exercise.exerciseID} 
          style={styles.exerciseItem}
          color="#62a4f5"
          onPress={() => navigation.navigate("PreWorkout", 
          {username: username, exerciseName: exercise.exerciseName, 
          exerciseID: exercise.exerciseID})}/>
          </View>
          } else {
            return <View key={3}>
          <Image style={{width: 0.8*width, height: 200, marginHorizontal: "10%", borderRadius: 25}} 
          source={require('../assets/3.jpg')}/>
          <Button title={exercise.exerciseName.toUpperCase()} 
          key={exercise.exerciseID} 
          style={styles.exerciseItem}
          color="#62a4f5"
          onPress={() => navigation.navigate("PreWorkout", 
          {username: username, exerciseName: exercise.exerciseName, 
          exerciseID: exercise.exerciseID})}/>
          </View>
          }
        })}
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