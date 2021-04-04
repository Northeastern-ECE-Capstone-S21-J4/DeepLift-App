import React from "react";
import { View, StyleSheet, Image, Button, Text, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import CalendarHeatmap from 'react-native-calendar-heatmap';
import { navigate } from "../navigation/RootNavigation";

global.session;

const Profile = () => {

  const username = "yajingwang1022";
  const [workoutDates, setWorkoutDates] = React.useState([]);
  const fetchWorkouts = async () => {
    const response = await fetch(`https://api.deepliftcapstone.xyz/workouts/user/${username}`);
    const workouts = await response.json();
    const wds = [];
    workouts.map((workout) => { wds.push({['date'] : workout.dateRecorded})});
    setWorkoutDates(wds);
    console.log(workoutDates);
  };

  React.useEffect(() => {
    fetchWorkouts()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={require('../assets/unnamed.png')}/>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{session.user.userName}</Text>
          <Ionicons name="location-sharp" style={styles.location}> Boston, MA</Ionicons>
        </View>
      </View>
      <View style={styles.calendar}>
      <Text style={styles.workoutSummary}>Workout Summary</Text>
      {workoutDates.length !== 0? <CalendarHeatmap
            endDate={new Date("2021-04-30")}
            numDays={124}
            colorArray={["#eee", "#bcd6f7", "#656ac6", "#393b99", "#191c5c"]}
            values={workoutDates}
          />: <View/>}
        </View>
      <Button title="Delete Account" color="red" disabled={true} onPress={checkDeleteAccount}/>
      <Button title="Log Out" color="red" onPress={signOut}/>
    </View>
  );
};

function checkDeleteAccount(){
  Alert.alert(
    "Delete Account?",
    "Are you sure you want to delete this account?",
    [
      {
        text: "Cancel"
      },
      {
        text: "Confirm",
        onPress: () => deleteAccount()
      }
    ],

  )
}

async function deleteAccount(){
  try{
    navigate("Login");
    session.apiInstance.deleteUser(session.user.userName)
    session.wipeSessionVars();
  } catch (error) {
    console.log("Error deleting account: ", error);
  }
}

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
  profile: {
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
    marginVertical: "15%",
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
    marginBottom: "15%",
  },
  workoutSummary: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: "10%",
    textAlign: "center"
  },
});

export default Profile;