import React from 'react';
import { AppRegistry } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/TabNavigator";

import Amplify from 'aws-amplify';
import config from './aws-exports';
import { withAuthenticator, AmplifyTheme } from 'aws-amplify-react-native';

Amplify.configure(config)

const MyButton = Object.assign({}, AmplifyTheme.button, { backgroundColor: '#9AC4F8', textAlign: 'center', verticalAlign: 'middle', height: '60px', borderRadius: '5px',});
const MyTheme = Object.assign({}, AmplifyTheme, { button: MyButton });
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

export default withAuthenticator(StarterApp, false, [], null, MyTheme);
