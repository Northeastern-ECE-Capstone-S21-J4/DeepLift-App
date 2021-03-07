import React, { useState }  from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import QRCode from 'react-native-qrcode-svg';

const QRCodePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <QRCode value={"{data: DeepLift is the best}"} size={200} color="#62a4f5"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QRCodePage;