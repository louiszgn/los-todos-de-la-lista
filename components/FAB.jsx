import React from 'react';
import { StyleSheet, Pressable } from "react-native";
import { Icon } from 'react-native-elements';

export function FAB (props) {

  return (
    <Pressable style={[styles.fab, { backgroundColor: props.backgroundColor }]}>
      <Icon name="add" type="material" color="#FFF" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    padding: 15,
    margin: 20,
    borderRadius: 50,
  },
})