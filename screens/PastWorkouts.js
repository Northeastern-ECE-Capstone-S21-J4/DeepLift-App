import React from "react";
import { View, StyleSheet, Text } from "react-native";

const PastWorkouts = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Past Workouts: </Text>
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
});

export default PastWorkouts;