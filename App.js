import React from 'react';
import { AppRegistry, SafeAreaView, StyleSheet } from "react-native";
import { NavigationContainer, StackActions, useNavigation } from "@react-navigation/native";
import { LoginStackNavigator } from "./navigation/LoginStackNavigator.js";
import { navigationRef, navigate } from "./navigation/RootNavigation.js";
import { Session } from './lib/user/session.js';

global.session = new Session();

class StarterApp extends React.Component {
  async componentDidMount(){
    await session.wipeSessionVars();
    await session.loadAllSessionVars();
    this.needsLogin = await session.checkLogin();
    if(this.needsLogin){
      navigate("Login");
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.area}>
        <NavigationContainer ref={navigationRef}>
          <LoginStackNavigator />
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  area: {
    flexDirection: "column",
    flex: 1
  }
})

AppRegistry.registerComponent("StarterApp", () => StarterApp);

export default StarterApp;