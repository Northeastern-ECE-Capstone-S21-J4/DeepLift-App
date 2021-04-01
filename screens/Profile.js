import React from "react";
import { View, StyleSheet, Image, Button, Text } from "react-native";
import { Auth } from 'aws-amplify';
import { Ionicons } from '@expo/vector-icons';
import CalendarHeatmap from 'react-native-calendar-heatmap';

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
      <View style={styles.calendar}>
      <CalendarHeatmap
            endDate={new Date("2021-04-30")}
            numDays={124}
            colorArray={["#eee", "#bcd6f7", "#656ac6", "#393b99", "#191c5c"]}
            values={[
              { date: '2021-01-01' },
              { date: '2021-01-22' },
              { date: '2021-01-22' },
              { date: '2021-01-22' },
              { date: '2021-01-22' },
              { date: '2021-01-22' },
              { date: '2021-01-22' },
              { date: '2021-01-22' },
              { date: '2021-01-22' },
              { date: '2021-01-22' },
              { date: '2021-01-22' },
              { date: '2021-01-22' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
              { date: '2021-03-30' },
            ]}
          />
        </View>
      <Button title="Delete Account" color="red" onPress={()=>{}}/>
      <Button title="Log Out" color="red" onPress={signOut}/>
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
  calendar: {
    marginHorizontal: "10%",
    marginTop: "5%",
    marginBottom: "20%",
  },
});

export default Profile;