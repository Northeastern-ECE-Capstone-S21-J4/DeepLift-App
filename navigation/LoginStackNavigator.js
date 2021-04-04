import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/Login";
import Signup from "../screens/Signup";
import BottomTabNavigator from "./TabNavigator";

const Stack = createStackNavigator();

const screenOptionStyle = {
    headerShown: false
};


const LoginStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Application" component={BottomTabNavigator} />
    </Stack.Navigator>
  )
}

export { LoginStackNavigator };
