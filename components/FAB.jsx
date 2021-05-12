import React from 'react';
import { StyleSheet, Pressable } from "react-native";
import { Icon } from 'react-native-elements';

export function FAB (props) {
  return (
    <Pressable style={[styles.fab, { backgroundColor: props.backgroundColor }]} onPress={() => props.onPress()} >
      <Icon name={props.icon} type="material" color="#FFF" />
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
})