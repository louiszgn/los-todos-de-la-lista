import React, { useState, useEffect } from 'react';
import Fire from '../Fire';
import { View } from "react-native";
import { ListItem } from 'react-native-elements';

export function HomeScreen ({ navigation }) {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect (() => {
    firebase = new Fire(error => {
      if (error) return alert("Une erreur est survenue");

      firebase.getLists(lists => {
        setLists(lists);
        setLoading(false);
      });

      return function unsubscribe () {
        firebase.detach();
      }
    })
  }, []);

  return (
    <View>
      { !loading &&
        lists.map(list => (
          <ListItem key={list.id} onPress={() => navigation.navigate('List', { list: list })} bottomDivider>
            <ListItem.Content>
              <ListItem.Title style={{ color: list.color }}>{ list.name }</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))
      }
    </View>
  );
};