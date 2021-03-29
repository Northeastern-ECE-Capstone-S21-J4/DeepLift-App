import React from "react";
import { ScrollView, StyleSheet, Text, Dimensions, Switch, View } from "react-native";
import { Video, AVPlaybackStatus } from 'expo-av';
import DropDownPicker from 'react-native-dropdown-picker';

const PastWorkouts = () => {
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
        workouts.sort((a, b) => a.dateRecorded - b.dateRecorded);
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
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>Past Workouts</Text>
        <View style={styles.row1}>
          <Text style={styles.subtitle}>Last workout: </Text>
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
        source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
        shouldPlay={false}
        useNativeControls
        resizeMode="stretch"
        isLooping={false}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
        style={{ width: 0.8*width, height: 200, marginHorizontal: "10%" }}
        /> :
        <Video
        ref={video}
        source={{ uri: 'https://videos-bucket-0001.s3.amazonaws.com/11/video_without.mp4' }}
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
          <Text style={styles.subtitle}>All workouts: </Text>
          <DropDownPicker items={dropdownItems}
          style={{backgroundColor: 'white'}}
          containerStyle={{width: "45%"}}
          dropDownStyle={{backgroundColor: 'white'}}
          itemStyle={{justifyContent: 'center'}}
          activeItemStyle={{backgroundColor: '#bad5f7'}}
          placeholder="Sort by"
          defaultValue={sortBy}
          onChangeItem={item => refreshWorkouts(item.value)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: '#31373b',
    fontSize: 20,
    margin: "5%",
    marginBottom: 0
  },
  row1: {
    flexDirection: "row",
    justifyContent: 'space-evenly'
  },
  subtitle: {
    fontWeight: 'bold',
    color: '#31373b',
    fontSize: 15,
    marginVertical: "3%",
    marginHorizontal: "5%"
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
    marginRight: "2%"
  },
  container: {
    flex: 1,
    flexDirection: 'column'
  },
});

export default PastWorkouts;