import React, { useState, useEffect } from 'react';
import Fire from '../Fire';
import { View, Text, Button } from "react-native";
import { ListItem } from 'react-native-elements/dist/list/ListItem';

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
      {/* { !loading &&
        lists.map((list, i) => (
          <ListItem key={i}>
            <ListItem.Content>
              <ListItem.Title>{ list.name }</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))
      } */}
      { loading && <Text>Loading...</Text> }
      { !loading &&
        lists.map(list => (
            <Text key={list.id} onPress={() => navigation.navigate('List', { list: list })}>{ list.name }</Text>
        ))
      }
    </View>
  );
};