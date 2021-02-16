import React from 'react';
import { AppRegistry } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/TabNavigator";

import Amplify from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config)

import { withAuthenticator } from 'aws-amplify-react-native'
class StarterApp extends React.Component {
  render() {
    return (
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
    );
  }
}

AppRegistry.registerComponent("StarterApp", () => StarterApp);

export default withAuthenticator(StarterApp);
