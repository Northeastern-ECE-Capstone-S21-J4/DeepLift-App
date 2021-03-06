import React from 'react';
import { APIHelper } from "./lib/api/api.js"
import { User } from "./lib/user/user.js"
import { AppRegistry, SafeAreaView } from "react-native";
import LoginScreen from "./screens/Login.js"
import { NavigationContainer, StackActions } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/TabNavigator";
import { MainStackNavigator } from "./navigation/StackNavigator.js";
import { Session } from './lib/user/session.js';

global.session = new Session();

class StarterApp extends React.Component {
  constructor(){
    super();
    this.needsLogin = true;
  }

  async componentDidMount(){
    //await session.wipeSessionVars();
    var users = await session.apiInstance.getUsers();
    console.log(users);
    await session.loadAllSessionVars();
    this.needsLogin = await session.checkLogin();
    // if(this.needsLogin){
    //   session.setUserName('bigjohn');
    //   session.setPW('password');
    //   await session.login();
    // }
  }

  render() {
    // if(this.needsLogin){
    //   return(
    //     <LoginScreen />
    //   )
    // }

    return (
      <SafeAreaView>
        <NavigationContainer>
          <MainStackNavigator />
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}

AppRegistry.registerComponent("StarterApp", () => StarterApp);

export default StarterApp;