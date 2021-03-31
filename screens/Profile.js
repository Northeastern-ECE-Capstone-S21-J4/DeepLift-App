import React from "react";
import { View, StyleSheet, Image, Button, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { navigate } from "../navigation/RootNavigation";

global.session;

const Profile = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profilePic}>
        <Image style={styles.avatar} source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>
        <View style={styles.userInfo}>
          <Text style={styles.username}>Yajing Wang</Text>
          <Ionicons name="location-sharp" style={styles.location}> Boston, MA</Ionicons>
        </View>
      </View>
      <Button title="Delete Account" color="red" onPress={()=>{}}/>
      <Button title="Log Out" color="red" onPress={signOut}/>
    </View>
  );
};

async function signOut() {
  try {
      session.wipeSessionVars();
      navigate("Login");
  } catch (error) {
      console.log('error signing out: ', error);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  profilePic: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "white",
    marginVertical: "10%",
  },
  userInfo: {
    marginVertical: "13%",
  },
  username: {
    fontWeight: "bold",
    fontSize: 20,
    margin: "2%",
    textAlign: "center"
  },
  location: {
    fontSize: 15,
    color: "gray",
    margin: "2%",
    textAlign: "center"
  },
});

export default Profile;