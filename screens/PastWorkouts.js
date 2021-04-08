import React from "react";
import { ScrollView, StyleSheet, Text, Dimensions, Switch, View, Button } from "react-native";
import { Video, AVPlaybackStatus } from 'expo-av';
import DropDownPicker from 'react-native-dropdown-picker';

global.session;

const PastWorkouts = ({ navigation }) => {
  const { width } = Dimensions.get('window');
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [sortBy, setSortBy] = React.useState("dateRecorded");
  const dropdownItems = [{label: 'Date', value: "dateRecorded"}, 
                          {label: 'Exercise Type', value: "exerciseName"},
                          {label: 'Lifted Weight', value: "weight"},
                          {label: 'Reps Count', value: "reps"},
                          {label: 'Difficulty', value: "difficulty"},
                        ];
  const [latestWithPath, setLatestWithPath] = React.useState("");
  const [latestWithoutPath, setLatestWithoutPath] = React.useState("");

  const username = session.user.userName;
  const [workouts, setWorkouts] = React.useState([]);
  const fetchWorkouts = async () => {
    const workouts = await session.apiInstance.getUserWorkouts(username);
    setWorkouts(workouts);
    setLatestWithPath(workouts[workouts.length - 1].video_with_path);
    setLatestWithoutPath(workouts[workouts.length - 1].video_without_path);
  };

  React.useEffect(() => {
    fetchWorkouts()
  }, [])

  
  const refreshWorkouts = (sb) => {
    setSortBy(sb);
    sortWorkouts(sb);
  };

  const sortWorkouts = (sb) => {
    switch(sb) {
      case "dateRecorded":
        workouts.sort((a, b) => a.dateRecorded.split('-').join('') - b.dateRecorded.split('-').join(''));
        break;
      case "exerciseName":
        workouts.sort((a, b) => a.exerciseName.toLowerCase() - b.exerciseName.toLowerCase());
        break;
      case "reps":
        workouts.sort((a, b) => a.reps - b.reps);
        break;
      case "weight":
        workouts.sort((a, b) => a.weight - b.weight);
        break;
      case "difficulty":
        workouts.sort((a, b) => a.difficulty - b.difficulty);
        break;
      default:
        Alert.alert("Ooops");
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Past Workouts</Text>
      <ScrollView>
      <View>
        <View style={styles.row1}>
          <Text style={styles.subtitle1}>Last workout: </Text>
            <Text style={styles.showAnalyticsText}>Show Analytics </Text>
            <Switch
              style={styles.showAnalyticsSwitch}
              trackColor={{ false: "gray", true: "#62a4f5" }}
              thumbColor={isEnabled ? "white" : "white"}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
        </View>
        {isEnabled?
        <Video
        ref={video}
        source={{ uri: `https://videos-bucket-0001.s3.amazonaws.com/${latestWithPath}` }}
        shouldPlay={false}
        useNativeControls
        resizeMode="stretch"
        isLooping={false}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
        style={{ width: 0.8*width, height: 200, marginHorizontal: "10%", borderRadius: 10 }}
        /> :
        <Video
        ref={video}
        source={{ uri: `https://videos-bucket-0001.s3.amazonaws.com/${latestWithoutPath}` }}
        shouldPlay={false}
        useNativeControls
        resizeMode="stretch"
        isLooping={false}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
        style={{ width: 0.8*width, height: 200, marginHorizontal: "10%", borderRadius: 10 }}
        /> }
      </View>
      <View>
        <View style={styles.row2}>
          <Text style={styles.subtitle2}>All workouts: </Text>
          <DropDownPicker items={dropdownItems}
          style={{backgroundColor: 'white'}}
          containerStyle={{width: "35%"}}
          dropDownStyle={{backgroundColor: 'white'}}
          itemStyle={{justifyContent: 'center'}}
          activeItemStyle={{backgroundColor: '#bad5f7'}}
          placeholder="Sort by"
          onChangeItem={item => refreshWorkouts(item.value)}
          />
        </View >
        <View style={{layoutDirection: 'LTR', width: "60%"}}>
        {workouts.map((workout) => {return <Button title={getWorkoutTitle(workout, sortBy)} 
                                            key={workout.workoutID} 
                                            color="#62a4f5"
                                            style={styles.button}
                                            onPress={() => navigation.navigate("WorkoutAnalytics", {workout})}/>})}
        </View>
      </View>
      </ScrollView>
    </View>
  );

  function getWorkoutTitle(workout, sortBy) {
    var workoutTitle = ""; 
    switch(sortBy) {
      case "dateRecorded":
        workoutTitle = workout.dateRecorded + " - " + workout.exerciseName;
        break;
      case "exerciseName":
        workoutTitle = "Type: " + workout.exerciseName;
        break;
      case "reps":
        workoutTitle = "Reps Count: " + workout.reps + " - " + workout.exerciseName;
        break;
      case "weight":
        workoutTitle = "Weight: " + workout.weight + " - " + workout.exerciseName;
        break;
      case "difficulty":
        workoutTitle = "Difficulty: " + workout.difficulty + " - " + workout.exerciseName;
        break;
      default:
        Alert.alert("Ooops");
      }
      return workoutTitle;
  }
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: '#31373b',
    fontSize: 20,
    margin: "5%",
    marginBottom: "3%"
  },
  row1: {
    flexDirection: "row",
    justifyContent: 'space-evenly'
  },
  subtitle1: {
    fontWeight: 'bold',
    color: '#31373b',
    fontSize: 15,
    marginVertical: "3%",
    marginLeft: "5%"
  },
  subtitle2: {
    fontWeight: 'bold',
    color: '#31373b',
    fontSize: 15,
    marginVertical: "3%",
    marginRight: "8%"
  },
  showAnalyticsText: {
    color: '#31373b',
    fontSize: 15,
    marginVertical: "3%",
  },
  showAnalyticsSwitch: {
    marginVertical: "2%",
    marginLeft: 0,
    marginRight: "5%"
  },
  row2: {
    flexDirection: "row",
    justifyContent: 'space-evenly',
    marginTop: "5%",
  },
  button: {
    width: 75
  },
  container: {
    flex: 1,
    flexDirection: 'column'
  },
});

export default PastWorkouts;