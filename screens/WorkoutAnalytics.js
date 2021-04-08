import React from "react";
import { ScrollView, StyleSheet, Text, Dimensions, Switch, View, FlatList } from "react-native";
import { Video } from 'expo-av';

const WorkoutAnalytics = ({ route, navigation }) => {
  const { width } = Dimensions.get('window');
  const { dateRecorded, exerciseName, reps, 
          weight, difficulty, workoutID, 
          video_with_path, video_without_path } = route.params.workout;
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout ID:  {workoutID}</Text>
      <View>
        {isEnabled?
        <Video
        ref={video}
        source={{ uri: `https://videos-bucket-0001.s3.amazonaws.com/${video_with_path}` }}
        shouldPlay={false}
        useNativeControls
        resizeMode="stretch"
        isLooping={false}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
        style={{ width: 0.8*width, height: 200, marginHorizontal: "10%", marginTop: "2%", borderRadius: 10 }}
        /> :
        <Video
        ref={video}
        source={{ uri: `https://videos-bucket-0001.s3.amazonaws.com/${video_without_path}` }}
        shouldPlay={false}
        useNativeControls
        resizeMode="stretch"
        isLooping={false}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
        style={{ width: 0.8*width, height: 200, marginHorizontal: "10%", marginTop: "2%", borderRadius: 10 }}
        /> }
        <View style={styles.row1}>
          <Text style={styles.showAnalyticsText}>Show Analytics </Text>
          <Switch
            style={styles.showAnalyticsSwitch}
            trackColor={{ false: "gray", true: "#62a4f5" }}
            thumbColor={isEnabled ? "white" : "white"}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>
      <View>
          <Text style={styles.subtitle}>Workout Information</Text>
          <FlatList
            style={styles.list}
            data={[
              {key: 'Exercise Type: ' + exerciseName},
              {key: 'Date: ' + dateRecorded},
              {key: 'Weight: ' + weight},
              {key: 'Reps Count: ' + reps},
              {key: 'Difficulty: ' + difficulty}]}
            renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    color: '#31373b',
    fontSize: 20,
    margin: "5%",
    marginBottom: "3%",
    textAlign: "center"
  },
  row1: {
    flexDirection: "row",
    justifyContent: 'space-evenly'
  },
  subtitle: {
    flexDirection: "row",
    justifyContent: 'space-evenly',
    marginVertical: "3%",
    fontWeight: 'bold',
    color: '#31373b',
    fontSize: 18,
    textAlign: "center"
  },  
  item: {
    fontSize: 15,
    marginVertical: "2%",
    textAlign: "center"
  },
  showAnalyticsText: {
    color: '#31373b',
    fontSize: 15,
    marginVertical: "5%",
  },
  showAnalyticsSwitch: {
    margin: "3%",
    marginLeft: 0
  },
  button: {
    width: 75,
  },
  container: {
    flex: 1,
    flexDirection: 'column'
  },
});

export default WorkoutAnalytics;