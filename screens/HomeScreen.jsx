import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable } from "react-native";
import { ListItem, Icon } from 'react-native-elements';
import Fire from '../Fire';
import { FAB } from '../components/FAB';
import { CustomModal } from '../components/CustomModal';

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
              <Icon onPress={() => firebase.deleteList(list.id)} name="delete" type="material" color="#a9a9a9" style={{ marginRight: 10 }}/>
              <ListItem.Title style={{ color: list.color, flex: 1 }} onPress={() => navigation.navigate('List', { list: list })}>{ list.name }</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))
      }
      <Text onPress={() => navigation.navigate('Add')}>Ajouter une liste</Text>
      <FAB icon="add" backgroundColor="#f4511e" onPress={() => setAddList(!addList)} />

      <CustomModal visible={addList}>
        <Text style={styles.modalTitle}>Ajouter une liste</Text>
        <View style={styles.buttonContainer}>
          <Pressable style={[styles.button, { backgroundColor: "#e60000" }]} onPress={() => setAddList(!addList)}>
            <Text style={{ color: "#FFF" }}>Annuler</Text>
          </Pressable>
          <Pressable style={[styles.button, { backgroundColor: "#00b300" }]} onPress={() => firebase.updateList(list.id, {name: name, color: color})}>
            <Text style={{ color: "#FFF" }}>Valider</Text>
          </Pressable>
        </View>
      </CustomModal>
    </View>
  );
}; 

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: 'center',
    marginBottom: 10,
  },
  input: {
    height: 35,
    borderBottomWidth: 2,
    borderColor: "#eee",
    marginBottom: 10,
  },
  buttonContainer: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
})