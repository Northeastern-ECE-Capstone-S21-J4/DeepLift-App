import React from "react";
import { ScrollView, StyleSheet, Text, Dimensions, Switch, View } from "react-native";
import { Video, AVPlaybackStatus } from 'expo-av';

const PastWorkouts = () => {
  const { width, height } = Dimensions.get('window');
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Past Workouts: </Text>
      <View style={styles.showAnalytics}>
        <Text style={styles.showAnalyticsText}>Show Analytics </Text>
        <Switch
          style={styles.showAnalyticsSwitch}
          trackColor={{ false: "gray", true: "#62a4f5" }}
          thumbColor={isEnabled ? "white" : "white"}
          ios_backgroundColor="white"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
      {isEnabled? <Video
        ref={video}
	      source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
        shouldPlay={false}
	      useNativeControls
        resizeMode="cover"
        isLooping={false}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
	      style={{ width: 0.8*width, height: 200, margin: "10%" }}
	    />:<Video
      ref={video}
      source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
      shouldPlay={false}
      useNativeControls
      resizeMode="cover"
      isLooping={false}
      onPlaybackStatusUpdate={status => setStatus(() => status)}
      style={{ width: 0.8*width, height: 200, marginHorizontal: "10%" }}
    />}
      
      
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
  showAnalytics: {
    flexDirection: "row",
    justifyContent: 'center'
  },
  showAnalyticsText: {
    color: '#31373b',
    fontSize: 15,
    margin: "3%",
  },
  showAnalyticsSwitch: {
    margin: "1%",
  },
  container: {
    flex: 1,
    flexDirection: 'column'
  },
});

export default PastWorkouts;