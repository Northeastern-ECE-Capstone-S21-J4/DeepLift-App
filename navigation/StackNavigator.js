import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import PreWorkout from "../screens/PreWorkout";
import Profile from "../screens/Profile";
import PastWorkouts from "../screens/PastWorkouts";
import QRCodePage from "../screens/QRCodePage";
import LoadingPage from "../screens/LoadingPage";
import WorkoutAnalytics from "../screens/WorkoutAnalytics";

const Stack = createStackNavigator();

const screenOptionStyle = {
  title: 'Deep Lift',
  headerTitleAlign: "center",
  headerTitleStyle: { 
    alignSelf: 'center', 
    marginTop: '5%',
    flex: 1 
  },
  headerStyle: {
    backgroundColor: "#62a4f5",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
  headerLeft: null
};

const PastWorkoutsStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="PastWorkouts" component={PastWorkouts} />
        <Stack.Screen name="WorkoutAnalytics" component={WorkoutAnalytics} />
      </Stack.Navigator>
    );
  };

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="PreWorkout" component={PreWorkout} />
      <Stack.Screen name="QRCodePage" component={QRCodePage} />
      <Stack.Screen name="LoadingPage" component={LoadingPage} />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export { PastWorkoutsStackNavigator, MainStackNavigator, ProfileStackNavigator };
