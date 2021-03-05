import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { Auth } from 'aws-amplify';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Button title="Sign Out" color="red" onPress={signOut}/>
    </View>
  );
};

async function signOut() {
  try {
      await Auth.signOut();
  } catch (error) {
      console.log('error signing out: ', error);
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
});

export default Profile;