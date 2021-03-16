import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import About from "../screens/About";
import LoginScreen from "../screens/Login";
import Profile from "../screens/Profile";
import PastWorkouts from "../screens/PastWorkouts";

const Stack = createStackNavigator();

const screenOptionStyle = {
  title: 'Deep Lift',
  headerTitleStyle: { 
    textAlign: 'center', 
    marginTop: '5%',
    flex: 1 
  },
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const PastWorkoutsStackNavigator = () => {
    return (
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="PastWorkouts" component={PastWorkouts} />
      </Stack.Navigator>
    );
  };

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Login" component={LoginScreen} />
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
