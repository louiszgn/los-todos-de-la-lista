import React from 'react';
import { View, Text, Button } from "react-native";

export function ListScreen ({ navigation, route }) {
  const { list } = route.params;

  return (
    <View>
      <Button title="Go back" onPress={() => navigation.goBack()} />
      {
        list.todos.map(todo => (
          <Text key={todo.id}>{ todo.title }</Text>
        ))
      }
    </View>
  );
};
