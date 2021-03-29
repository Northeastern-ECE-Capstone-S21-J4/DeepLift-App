import React from "react";
import { ScrollView, StyleSheet, Text, Dimensions, Switch, View } from "react-native";
import { Video, AVPlaybackStatus } from 'expo-av';
import DropDownPicker from 'react-native-dropdown-picker';

const PastWorkouts = () => {
  const { width, height } = Dimensions.get('window');
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const [sortBy, setSortBy] = React.useState("1");
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
          <DropDownPicker items={[{label: 'Most Recent', value: "1"}, {label: 'Exercise Type', value: "2"}]}
          style={{backgroundColor: 'white'}}
          containerStyle={{width: "45%"}}
          dropDownStyle={{backgroundColor: 'white'}}
          itemStyle={{justifyContent: 'center'}}
          activeItemStyle={{backgroundColor: '#bad5f7'}}
          placeholder="Sort by"
          defaultValue={sortBy}
          onChangeItem={item => setSortBy(item.value)}
          />
        </View>
        {sortBy=="1"? <Text>Most Recent</Text>:<Text>Exercise Type</Text>}
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