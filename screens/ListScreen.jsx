import React, { useState } from 'react';
import { StyleSheet, View, Text } from "react-native";
import { ListItem, Icon, Divider } from 'react-native-elements';

export function ListScreen ({ route }) {
  const { list } = route.params;
  const [editList, setEditList] = useState(false);

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
    flex: 1,
    textAlign: 'center',
  },
  todoItem: {
    flexDirection: 'row',
  },
});