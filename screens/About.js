import React from "react";
import { View, StyleSheet, Text } from "react-native";


// TO DO: can rename this file to something that makes more sense, like StartWorkout
const About = () => {
  return (
    <View style={styles.center}>
      <Text>Workout Starting...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default About;