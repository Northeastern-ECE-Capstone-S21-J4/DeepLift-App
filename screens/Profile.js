import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { Auth } from 'aws-amplify';

const Profile = () => {
  return (
    <View style={styles.center}>
      <Text>This is the profile screen</Text>
      <Text onPress={signOut}> Sign Out </Text>
    </View>
  );
};

async function signOut() {
  try {
      await Auth.signOut({ global: true });
  } catch (error) {
      console.log('error signing out: ', error);
  }
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default Profile;