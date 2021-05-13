import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, TextInput, Alert } from "react-native";
import { ColorPicker } from 'react-native-color-picker'
import { ListItem, Icon } from 'react-native-elements';
import { CustomModal } from '../components/CustomModal';
import { FAB } from '../components/FAB';
import Fire from '../Fire';

export function HomeScreen ({ navigation }) {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addList, setAddList] = useState(false);

  const [name, setName] = useState('');
  const [color, setColor] = useState('#5393ff');

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

  const showAlert = (list) => {
    Alert.alert(
      `Supprimer ${list.name} ?`,
      "",
      [
        {
          text: "Annuler",
          onPress: () => {},
        },
        {
          text: "Valider",
          onPress: () => { firebase.deleteList(list.id) },
        }
      ]
    )
  };

  return (
    <View style={{ flex: 1 }}>
      { !loading &&
        lists.map(list => (
          <ListItem key={list.id} bottomDivider>
            <ListItem.Content style={{ flexDirection: 'row' }}>
              <Icon onPress={() => showAlert(list)} name="delete" type="material" color="#a9a9a9" style={{ marginRight: 10 }}/>
              <ListItem.Title style={{ color: list.color, flex: 1 }} onPress={() => navigation.navigate('List', { list: list })}>{ list.name }</ListItem.Title>
              {
                (list.todos.filter(todo => todo.completed).length === list.todos.length) &&
                <Icon name="done" type="material" color="#00b300" />
              }
            </ListItem.Content>
          </ListItem>
        ))
      }

      <FAB icon="add" backgroundColor="#5393ff" onPress={() => setAddList(!addList)} />

      <CustomModal visible={addList} style={{ height: "60%"}}>
        <Text style={styles.modalTitle}>Ajouter une liste</Text>
        <TextInput
          type="text"
          placeholder="Nom"
          value={name}
          onChangeText={(value) => setName(value)}
          style={styles.input}
        />
        <TextInput
          type="text"
          placeholder="Couleur"
          editable={false}
          value={color}
          onChangeText={(value) => setColor(value)}
          style={styles.input}
        />
        <ColorPicker
          defaultColor="#5393ff"
          onColorSelected={color => setColor(color)}
          style={{flex: 1}}
        />
        <View style={styles.buttonContainer}>
          <Pressable style={[styles.button, { backgroundColor: "#e60000" }]} onPress={() => setAddList(!addList)}>
            <Text style={{ color: "#FFF" }}>Annuler</Text>
          </Pressable>
          <Pressable style={[styles.button, { backgroundColor: "#00b300" }]} onPress={() => {
            firebase.addList({name: name, color: color, todos: []});
            setName('')
            setColor('#5393ff')
            setAddList(!addList);
          }}>
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