import React from 'react';
import { APIHelper } from "./lib/api/api.js"
import { AppRegistry } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/TabNavigator";

// TO DO: need to do more research on Provider
// const store = createStore(AppReducer, applyMiddleware(middleware));
var apiHelper = new APIHelper("https://api.deepliftcapstone.xyz");//"http://127.0.0.1:8000");

class StarterApp extends React.Component {
  async componentDidMount(){
    await apiHelper.getToken("username", "password");
    apiHelper.getUsers();
    apiHelper.getUserById(1);
    apiHelper.getWorkoutById(1);
    apiHelper.getUserWorkouts(1);
    apiHelper.getUserExerciseById(1, 1);
    apiHelper.getExercises();
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
