import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Pressable, TextInput, Alert } from "react-native";
import { ListItem, Icon, Divider } from 'react-native-elements';
import { CustomModal } from '../components/CustomModal';
import { FAB } from '../components/FAB';
import Fire from '../Fire';

export function ListScreen ({ route }) {
  const { list } = route.params;
  const [editList, setEditList] = useState(false);
  const [editTask, setEditTask] = useState(false);

  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  const [title, setTitle] = useState('');

  useEffect (() => {
    firebase = new Fire(error => {
      if (error) return alert("Une erreur est survenue");
    
      return function unsubscribe () {
        firebase.detach();
      }
    })
  }, []);

  const showAlert = (listId, task) => {
    Alert.alert(
      `Supprimer ${task.title} ?`,
      "",
      [
        {
          text: "Annuler",
          onPress: () => {},
        },
        {
          text: "Valider",
          onPress: () => { firebase.deleteTask(listId, {id: task.id}) },
        }
      ]
    )
  };

  function idGenerator () {
    return Math.floor((1 + Math.random()) * 0x1000000000).toString(16)
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerView}>
        <Text style={styles.headerTitle}>{ list.todos.filter(todo => todo.completed).length } / { list.todos.length }</Text>
        <Icon name="edit" type="material" color="#a9a9a9" onPress={() => setEditList(!editList)} />
      </View>
      <Divider />
      {
        list.todos.map(todo => (
          <ListItem key={todo.id} bottomDivider>
            <ListItem.Content style={styles.todoItem}>
              <ListItem.CheckBox
                onPress={() => {  }}
                checked={todo.completed}
              />
              <ListItem.Title style={{ flex: 4 }}>{ todo.title }</ListItem.Title>
              <Icon name="delete" type="material" color="#a9a9a9" onPress={() => showAlert(list.id, todo)} />
            </ListItem.Content>
          </ListItem>
        ))
      }

      <FAB icon="add" backgroundColor={list.color} onPress={() => setEditTask(!editTask)} />

      <CustomModal visible={editTask}>
        <Text style={styles.modalTitle}>Ajouter une tâche</Text>
        <TextInput
          type="text"
          placeholder="Titre"
          value={title}
          onChangeText={(value) => setTitle(value)}
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
          <Pressable style={[styles.button, { backgroundColor: "#e60000" }]} onPress={() => setEditTask(!editTask)}>
            <Text style={{ color: "#FFF" }}>Annuler</Text>
          </Pressable>
          <Pressable style={[styles.button, { backgroundColor: "#00b300" }]} onPress={() => {
            firebase.newTask(list.id, {title: title, completed: false, id: idGenerator()})
            setTitle('')
            setEditTask(!editTask)
          }}>
            <Text style={{ color: "#FFF" }}>Valider</Text>
          </Pressable>
        </View>
      </CustomModal>


      <CustomModal visible={editList}>
        <Text style={styles.modalTitle}>Paramètres de la liste</Text>
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
          value={color}
          onChangeText={(value) => setColor(value)}
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
          <Pressable style={[styles.button, { backgroundColor: "#e60000" }]} onPress={() => setEditList(!editList)}>
            <Text style={{ color: "#FFF" }}>Annuler</Text>
          </Pressable>
          <Pressable style={[styles.button, { backgroundColor: "#00b300" }]} onPress={() => {
            firebase.updateList(list.id, {name: name, color: color})
            setName('')
            setColor('')
            setEditList(!editList)
          }}>
            <Text style={{ color: "#FFF" }}>Valider</Text>
          </Pressable>
        </View>
      </CustomModal>
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
});