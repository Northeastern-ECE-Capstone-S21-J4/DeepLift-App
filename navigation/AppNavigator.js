import { Animated, Easing} from "react-native";
import { connect } from "react-redux";
import {createStackNavigator} from 'react-navigation-stack'
import { createReactNavigationReduxMiddleware, createReduxContainer 
        } from "react-navigation-redux-helpers";
import LoginScreen from "../screens/Login";
import SignupScreen from "../screens/Signup";
import WelcomeScreen from "../screens/WelcomeScreen";

const noTransitionConfig = () => ({
    transitionSpec: {
      duration: 0,
      timing: Animated.timing,
      easing: Easing.step0
    }
  });

  const middleware = createReactNavigationReduxMiddleware(
    state => state.nav
  );

  // Login stack
const LoginStack = createStackNavigator(
    {
      Login: { screen: LoginScreen },
      Signup: { screen: SignupScreen },
      Welcome: { screen: WelcomeScreen }
    },
    {
      initialRouteName: "Welcome",
      headerMode: "float",
      navigationOptions: ({ navigation }) => ({
        headerTintColor: "red",
        headerTitleStyle: styles.headerTitleStyle
      }),
      cardStyle: { backgroundColor: "#FFFFFF" }
    }
  );

// Manifest of possible screens
const RootNavigator = createStackNavigator(
    {
      LoginStack: { screen: LoginStack },
      TabNavigator: { screen: TabNavigator }
    },
    {
      // Default config for all screens
      headerMode: "none",
      initialRouteName: "TabNavigator",
      transitionConfig: noTransitionConfig,
      navigationOptions: ({ navigation }) => ({
        color: "black"
      })
    }
  );

const AppWithNavigationState = createReduxContainer(RootNavigator, "root");

const mapStateToProps = state => ({
  state: state.nav
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);


export { RootNavigator, AppNavigator, middleware };