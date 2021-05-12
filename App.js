import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button } from 'react-native';
import { Header,Icon } from 'react-native-elements';
import { HomeScreen } from './screens/HomeScreen';
import { ListScreen } from './screens/ListScreen';
import { ParamsScreen } from './screens/ParamsScreen';

// Header btn home, titre ('Mes Todos' par défaut), engrenage (pour params globaux)
// Liste des todo liste (btn flottant pour ajouter une liste)
// Ouverture d'une liste : le header se mets à la couleur de la liste, le titre dans le header devient celui de la liste
// Détails d'une liste : nb des tâches terminées sur le nb total, btn pour modifier les params de la liste, liste des tâches, btn flottant pour ajouter une tâche
// Ouverture d'une tâche : popup (style param iphone) avec 3 options : terminer, modifier, supprimer
// Page params globaux : couleur par défaut, btn save, etc

const Stack = createStackNavigator();

export default function App () {
  return (
    <View style={styles.appContainer}>
      <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator screenOptions={({ navigation }) => ({
            cardStyle: { backgroundColor: '#FFF' },
            headerStyle: { backgroundColor: '#f4511e' },
            headerTitleStyle: { fontWeight: 'bold' },
            headerTintColor: '#fff',
            headerRight: () => (
              <Icon
                onPress={() => navigation.navigate('Params')}
                name="settings"
                type="material"
                color="#fff"
              />
            ),
          })}>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Los todos' }} />
            <Stack.Screen name="List" component={ListScreen} options={({ route }) => ({
              title: route.params.list.name,
              headerStyle: { backgroundColor: route.params.list.color }
            })}/>
            <Stack.Screen name="Params" component={ParamsScreen} options={{ title: 'Los parametras' }} />
          </Stack.Navigator>
        </NavigationContainer>
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
