import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput } from "react-native";
import Fire from '../Fire';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';

export function AddList ({ navigation}) {

    const [name, setName] = useState('');
    const [color, setColor] = useState('');
    const [text, onChangeText] = React.useState("Useless Text");

        useEffect (() => {
        firebase = new Fire(error => {
          if (error) return alert("Une erreur est survenue");
        
          return function unsubscribe () {
            firebase.detach();
          }
        })
    }, []);

  return (
    <View>
            <Text>Créer une liste</Text>
                <TextInput
                type="text"
                placeholder="Nom"
                value={name}
                onChangeText={(value) => setName(value)}
                />
                <TextInput
                type="text"
                placeholder="Couleur"
                value={color}
                onChangeText={(value) => setColor(value)}
                />

        <Button title="Valider" onPress={() => firebase.addList({name: name, color: color, todos: []})}/>
        <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );

};