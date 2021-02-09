import React from 'react';
import { AppRegistry } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/TabNavigator";

<<<<<<< HEAD
// TO DO: need to do more research on Provider
// const store = createStore(AppReducer, applyMiddleware(middleware));
class StarterApp extends React.Component {
  render() {
    return (
      // <Provider store={store}>
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      // </Provider>
      
    );
  }
=======
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Let's go DeepLift!</Text>
      <StatusBar style="auto" />
    </View>
  );
<<<<<<< HEAD
=======
=======
import RecordingScreen from './app/screens/RecordingScreen';
import SetInformationScreen from './app/screens/SetInformationScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';

export default function App() {
  return (
    <SetInformationScreen />
  )
>>>>>>> 90344bb5... Basic Camera code
>>>>>>> caf7ec97... fixing some screwy commits
>>>>>>> dropping commit from other branch that somehow ended up here
}

AppRegistry.registerComponent("StarterApp", () => StarterApp);

export default StarterApp;
