import React from 'react';
import { APIHelper } from "./lib/api/api.js"
import { AppRegistry } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./navigation/TabNavigator";
import { Amplify, Auth } from 'aws-amplify';
import config from './aws-exports';
import { withAuthenticator, AmplifyTheme } from 'aws-amplify-react-native';

Amplify.configure(config)

const MyButton = Object.assign({}, AmplifyTheme.button, { backgroundColor: '#62a4f5', textAlign: 'center', verticalAlign: 'middle', height: '60px', borderRadius: '5px',});
const MyTheme = Object.assign({}, AmplifyTheme, { button: MyButton });

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
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
    );
  }
}

async function getCurrentUser() {
  const { attributes } = await Auth.currentAuthenticatedUser();
  const userEmail = attributes.email;
  return userEmail;
}

AppRegistry.registerComponent("StarterApp", () => StarterApp);

export default withAuthenticator(StarterApp, false, [], null, MyTheme);
