import React from 'react';
import { AppRegistry } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import AppReducer from "./reducers/index";
import BottomTabNavigator from "./navigation/TabNavigator";

// TO DO: need to do more research on Provider
const store = createStore(AppReducer, applyMiddleware(middleware));
class StarterApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

AppRegistry.registerComponent("StarterApp", () => StarterApp);

export default StarterApp;
