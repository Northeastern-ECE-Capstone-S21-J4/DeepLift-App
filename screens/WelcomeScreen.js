import React from 'react';
import { View, Text, StatusBar} from "react-native";

// Old testing file -- currently not used

function WelcomeScreen(props) {
    return (
        <View style={styles.container}>
          <Text>Let's go DeepLift!</Text>
          <StatusBar style="auto" />
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });  

export default WelcomeScreen;