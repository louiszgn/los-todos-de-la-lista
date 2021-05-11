import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { ListItem, Icon } from 'react-native-elements';

export function ListScreen ({ navigation, route }) {
  const { list } = route.params;

  return (
    <View>
      <View style={styles.headerView}>
        <Icon name="arrow-back-ios" type="material" color="#a9a9a9" onPress={() => navigation.goBack()} />
        <Text style={[styles.headerTitle, { color: list.color }]}>{ list.name }</Text>
        <Icon name="settings" type="material" color="#a9a9a9" />
      </View>
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
    paddingBottom: 10,
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