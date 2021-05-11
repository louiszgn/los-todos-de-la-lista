import React from 'react';
import { View, Text, Button } from "react-native";

export function Weee ({ navigation }) {
  return (
    <View style={{backgroundColor: '#FFF'}}>
      <Text>LET'S FUUUUUCKIIIIING GOOOOOOOOOOOOOOOOOOO</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};