import 'react-native-gesture-handler';
import React, { useState } from 'react';
import Fire from './Fire';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Header } from 'react-native-elements';
import { HomeScreen } from './screens/HomeScreen';
import { Weee } from './screens/Weee';

// Header btn home, titre ('Mes Todos' par défaut), engrenage (pour params globaux)
// Liste des todo liste (btn flottant pour ajouter une liste)
// Ouverture d'une liste : le header se mets à la couleur de la liste, le titre dans le header devient celui de la liste
// Détails d'une liste : nb des tâches terminées sur le nb total, btn pour modifier les params de la liste, liste des tâches, btn flottant pour ajouter une tâche
// Ouverture d'une tâche : popup (style param iphone) avec 3 options : terminer, modifier, supprimer
// Page params globaux : couleur par défaut, btn save, etc

const Stack = createStackNavigator();

export default function App() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <View style={styles.appContainer}>
      {/* <StatusBar style="auto" /> */}
      <Header
        leftComponent={{ icon: 'menu', color: '#FFF' }}
        centerComponent={{ text: 'Los todos', style: { color: '#FFF' } }}
        rightComponent={{ icon: 'home', color: '#FFF' }}
        style={{ flex: 1 }}
      />
      <View style={styles.contentContainer}>
        {/* <NavigationContainer>
          <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: '#FFF' }, headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Weee" component={Weee} />
          </Stack.Navigator>
        </NavigationContainer> */}
        <Text>{ lists }</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'flex-start',
  },
  contentContainer: {
    flex: 5,
    padding: 15,
  },
});
