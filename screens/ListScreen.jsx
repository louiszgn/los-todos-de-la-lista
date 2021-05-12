import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Modal, Pressable, TextInput, Button } from "react-native";
import { ListItem, Icon, Divider } from 'react-native-elements';
import Fire from '../Fire';

export function ListScreen ({ route }) {
  const { list } = route.params;
  const [editList, setEditList] = useState(false);
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

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
      <View style={styles.headerView}>
        <Text style={styles.headerTitle}>{ list.todos.filter(todo => todo.completed).length } / { list.todos.length }</Text>
        <Icon name="edit" type="material" color="#a9a9a9" onPress={() => setEditList(!editList)} />
      </View>
      <Divider />
      {
        list.todos.map(todo => (
          <ListItem key={todo.id} bottomDivider>
            <ListItem.Content style={styles.todoItem}>
              <ListItem.CheckBox checked={todo.completed} />
              <ListItem.Title style={{ flex: 4 }}>{ todo.title }</ListItem.Title>
              <Icon name="edit" type="material" color="#a9a9a9" />
            </ListItem.Content>
          </ListItem>
        ))
      }

      <Modal
        visible={editList}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Modal des paramètres de la liste</Text>
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
            <Button title="Valider" onPress={() => firebase.updateList(list.id, {name: name, color: color})}/>
            <Pressable style={styles.button} onPress={() => setEditList(!editList)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: 'center',
  },
  todoItem: {
    flexDirection: 'row',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
});