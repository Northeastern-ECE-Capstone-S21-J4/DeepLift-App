import React from 'react';
import { APIHelper } from "./lib/api/api.js"
import { User } from "./lib/user/user.js"
import { AppRegistry, SafeAreaView } from "react-native";
import LoginScreen from "./screens/Login.js"
import { NavigationContainer, StackActions } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/TabNavigator";
import { MainStackNavigator } from "./navigation/StackNavigator.js";
import { navigationRef, navigate } from "./navigation/RootNavigation.js";
import { Session } from './lib/user/session.js';

Amplify.configure(config)

const MyButton = Object.assign({}, AmplifyTheme.button, { backgroundColor: '#62a4f5', textAlign: 'center', verticalAlign: 'middle', borderRadius: '5px',});
const MyTheme = Object.assign({}, AmplifyTheme, { button: MyButton });

// TO DO: need to do more research on Provider
// const store = createStore(AppReducer, applyMiddleware(middleware));
var apiHelper = new APIHelper("https://api.deepliftcapstone.xyz");//"http://127.0.0.1:8000");

class StarterApp extends React.Component {
  // async componentDidMount(){
  //   await apiHelper.getToken("username", "password");
  //   apiHelper.getUsers();
  //   apiHelper.getUserById(1);
  //   apiHelper.getWorkoutById(1);
  //   apiHelper.getUserWorkouts(1);
  //   apiHelper.getUserExerciseById(1, 1);
  //   apiHelper.getExercises();
  // }

  render() {
    // if(this.needsLogin){
    //   return(
    //     <LoginScreen />
    //   )
    // }

    return (
      <NavigationContainer ref={navigationRef}>
        <MainStackNavigator />
      </NavigationContainer>
    );
  }
}

AppRegistry.registerComponent("StarterApp", () => StarterApp);

export default StarterApp;