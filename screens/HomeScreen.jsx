import React, { useState, useEffect } from 'react';
import { View, Text } from "react-native";
import { ListItem, Icon } from 'react-native-elements';
import Fire from '../Fire';
import { FAB } from '../components/FAB'

export function HomeScreen ({ navigation }) {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addList, setAddList] = useState(false);

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
    <View style={{ flex: 1 }}>
      { !loading &&
        lists.map(list => (
          <ListItem key={list.id} bottomDivider>
            <ListItem.Content style={{ flexDirection: 'row' }}>
              <Icon name="delete" type="material" color="#a9a9a9" style={{ marginRight: 10 }}/>
              <ListItem.Title style={{ color: list.color, flex: 1 }} onPress={() => navigation.navigate('List', { list: list })}>{ list.name }</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))
      }
      <Text onPress={() => navigation.navigate('Add')}>Ajouter une liste</Text>
      <FAB backgroundColor="#f4511e" />
    </View>
  );
};