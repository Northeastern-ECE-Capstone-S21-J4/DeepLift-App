import React from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";

const LoadingPage = ({ navigation }) => {
  setTimeout(() => {
    navigation.navigate('Home');
  }, 2000); 

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Analyzing and uploading to cloud...</Text>
      <ActivityIndicator size="large" color="#62a4f5" />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    margin: "5%"
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingPage;