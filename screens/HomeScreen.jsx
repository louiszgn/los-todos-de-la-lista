import React from 'react';
import { View, Text, Button } from "react-native";

export function HomeScreen ({ navigation }) {
  return (
    <View style={{backgroundColor: '#FFF'}}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Prout</Text>
      <Button
        title="Weee"
        onPress={() => navigation.navigate('Weee') }
      />
      {/* Liste des todo list (btn ajout dedans)*/}
    </View>
  );
};


// const ProfileScreen = ({ navigation, route }) => {
//   return <Text>This is {route.params.name}'s profile</Text>;
// };