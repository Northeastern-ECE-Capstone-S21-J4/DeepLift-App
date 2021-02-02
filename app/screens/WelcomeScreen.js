import React from 'react';
import { View, Text, StatusBar, StyleSheet } from "react-native";

function WelcomeScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Let's go DeepLift!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WelcomeScreen;