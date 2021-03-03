import React from 'react';
import { APIHelper } from "./lib/api/api.js"
import { User } from "./lib/user/user.js"
import { AppRegistry } from "react-native";
import Login from "./screens/Login.js"
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/TabNavigator";
import SetInformationScreen from './screens/SetInformationScreen.js';

var apiHelper = new APIHelper("https://api.deepliftcapstone.xyz");//"http://127.0.0.1:8000");//
var user = new User("bigjohn", "password")

class StarterApp extends React.Component {
  async componentDidMount(){
    apiHelper.login(user)
    apiHelper.getUsers();
  }

  render() {
    return (
      <Login />
    );
  }
}

AppRegistry.registerComponent("StarterApp", () => StarterApp);

export default StarterApp;