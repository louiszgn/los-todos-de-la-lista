import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from "react-native";

export function ParamsScreen () {
  const [nbClick, setNbClick] = useState(0);

  return (
    <View style={styles.container}>
      { (nbClick >= 10 && nbClick <= 20) &&
        <Text style={styles.text}>Allez</Text>
      }
      { (nbClick >= 25 && nbClick <= 35) &&
        <Text style={styles.text}>Tu peux le faire</Text>
      }
      { (nbClick >= 40 && nbClick <= 50) &&
        <Text style={styles.text}>Vraiment trop fort</Text>
      }
      { (nbClick >= 60 && nbClick <= 70) &&
        <Text style={styles.text}>Bon c'est long là</Text>
      }
      { (nbClick >= 80 && nbClick <= 90) &&
        <Text style={styles.text}>Encore là ?</Text>
      }
      { (nbClick < 100) &&
        <Pressable style={[styles.button, { backgroundColor: "#e60000" }]} onPress={() => setNbClick(nbClick + 1)}>
          <Text style={styles.buttonText}>{ nbClick }</Text>
        </Pressable>
      }
      { (nbClick >= 100) &&
        <Image source={{ uri: 'https://louiszeggane.com/images/SantanaPoke.png' }} style={{width: "100%", height: "80%"}} />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    position: 'absolute',
    top: "25%",
    left: 0,
    width: "100%",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: 75,
    borderRadius: 50,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonText: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },
})