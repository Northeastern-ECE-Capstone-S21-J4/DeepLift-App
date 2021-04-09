import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "../screens/Login";
import Signup from "../screens/Signup";
import BottomTabNavigator from "./TabNavigator";

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
};


const LoginStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle} >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Application" component={BottomTabNavigator} options={{header: () => null}} />
    </Stack.Navigator>
  )
}

export { LoginStackNavigator };
