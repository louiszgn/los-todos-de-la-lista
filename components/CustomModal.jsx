import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Modal, Pressable, Text } from "react-native";

export function CustomModal (props) {
  // const [visibleState, setVisibleState] = useState(props);

  // useEffect(() => {
  //   setVisibleState(props);
  // }, [props]);

  return (
    <Modal
      visible={props.visible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.centeredView}>
        <View style={{...styles.modalView, ...props.style}}>
          {/* <Pressable style={styles.button} onPress={() => setVisibleState(!visibleState.visible)}>
            <Text>Close</Text>
          </Pressable> */}
          { props.children }
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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