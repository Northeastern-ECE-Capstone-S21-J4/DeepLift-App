import React from 'react';
import { APIHelper } from "./lib/api/api.js"
import { AppRegistry, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/TabNavigator";

// TO DO: need to do more research on Provider
// const store = createStore(AppReducer, applyMiddleware(middleware));
var apiHelper = new APIHelper("http://127.0.0.1:8000");

class StarterApp extends React.Component {
  async componentDidMount(){
    await apiHelper.getToken("sam", "3AYnpU7p46fr");
    var users = apiHelper.getRequest("/users");
  }

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
