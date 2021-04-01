import React from "react";
import { ScrollView, StyleSheet, Text, Dimensions, Switch, View, Button } from "react-native";
import { Video, AVPlaybackStatus } from 'expo-av';
import DropDownPicker from 'react-native-dropdown-picker';

const PastWorkouts = ({ navigation }) => {
  const { width } = Dimensions.get('window');
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [sortBy, setSortBy] = React.useState("dateRecorded");
  const dropdownItems = [{label: 'Most Recent', value: "dateRecorded"}, 
                          {label: 'Exercise Type', value: "exerciseName"},
                          {label: 'Reps Count', value: "reps"},
                          {label: 'Lifted Weight', value: "weight"},
                          {label: 'Difficulty', value: "difficulty"},
                        ];


  const username = "yajingwang1022";
  const [workouts, setWorkouts] = React.useState([]);
  const fetchWorkouts = async () => {
    const response = await fetch(`https://api.deepliftcapstone.xyz/workouts/user/${username}`);
    const workouts = await response.json();
    setWorkouts(workouts);
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
        workouts.sort((a, b) => b.dateRecorded.split('-').join('') - a.dateRecorded.split('-').join(''));
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
      console.log(workouts);
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
        source={{ uri: 'https://videos-bucket-0001.s3.amazonaws.com/27/video_with.mp4' }}
        shouldPlay={false}
        useNativeControls
        resizeMode="stretch"
        isLooping={false}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
        style={{ width: 0.8*width, height: 200, marginHorizontal: "10%" }}
        /> :
        <Video
        ref={video}
        source={{ uri: 'https://videos-bucket-0001.s3.amazonaws.com/27/video_without.mp4' }}
        shouldPlay={false}
        useNativeControls
        resizeMode="stretch"
        isLooping={false}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
        style={{ width: 0.8*width, height: 200, marginHorizontal: "10%" }}
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
          defaultValue={sortBy}
          onChangeItem={item => refreshWorkouts(item.value)}
          />
        </View >
        <View style={{layoutDirection: 'LTR', width: "60%"}}>
        {workouts.map((workout) => {return <Button title={getWorkoutTitle(workout, sortBy)} 
                                            key={workout.workoutID} 
                                            color="#62a4f5"
                                            style={styles.button}
                                            onPress={() => navigation.navigate("Home")}/>})}
        </View>
      </View>
      </ScrollView>
    </View>
  );

  function getURI() {

  }

  function getWorkoutTitle(workout, sortBy) {
    var workoutTitle = ""; 
    switch(sortBy) {
      case "dateRecorded":
        workoutTitle = "Date: " + workout.dateRecorded;
        break;
      case "exerciseName":
        workoutTitle = "Type: " + workout.exerciseName;
        break;
      case "reps":
        workoutTitle = "Reps Count: " + workout.reps;
        break;
      case "weight":
        workoutTitle = "Weight: " + workout.weight;
        break;
      case "difficulty":
        workoutTitle = "Difficulty: " + workout.difficulty;
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
    marginHorizontal: "5%"
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
    margin: "2%",
    marginLeft: 0
  },
  row2: {
    flexDirection: "row",
    justifyContent: 'space-evenly',
    marginTop: "5%",
  },
  button: {
    width: 75,
  },
  container: {
    flex: 1,
    flexDirection: 'column'
  },
});

export default PastWorkouts;