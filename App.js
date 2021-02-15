import React from 'react';
import { AppRegistry } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/TabNavigator";

import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

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
}

AppRegistry.registerComponent("StarterApp", () => StarterApp);

export default StarterApp;
