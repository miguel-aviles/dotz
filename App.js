import React, {useState} from 'react';
import { SelectList } from 'react-native-dropdown-select-list'
import {Alert, Modal, StyleSheet, Text, TouchableHighlight, Pressable, View, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

enableScreens();

function HomeScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = React.useState("");
  
  const data = [
      {key:'1', value:'4x4'},
      {key:'2', value:'5x5'},
      {key:'3', value:'6x6'},
      {key:'4', value:'7x7'},
      {key:'5', value:'8x8'},
      {key:'6', value:'9x9'},
      {key:'7', value:'10x10'},
  ]

  function doubleWhammy(){
    setModalVisible(!modalVisible);
    navigation.navigate("Board");
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Choose your game's dimensions</Text>
            <SelectList 
                style={styles.modalText}
                setSelected={(val) => setSelected(val)} 
                data={data}
                save="value"
                
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => 
                doubleWhammy()
              }>
              <Text style={styles.textStyle}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Play game</Text>
      </Pressable>
    </View>
  );
}



function Board() {
  var [ isPress, setIsPress ] = React.useState(false);

  var touchProps = {
    // <-- "backgroundColor" will be always overwritten by "underlayColor"
    style: isPress ? styles.dotPress : styles.dot, // <-- but you can still apply other style changes
    onPress: () => isPress ? setIsPress(false) : setIsPress(true),                 // <-- "onPress" is apparently required
  };

  return (
        <View style={styles.container}>
          <TouchableHighlight {...touchProps}>
            <View/>
          </TouchableHighlight>
        </View>
  );
}

const Stack = createNativeStackNavigator();



const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'white',
  },
  boardView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  dot: {
    borderRadius: 15,
    width: 30,
    height: 30,
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 3,
  },
  dotPress: {
    borderRadius: 15,
    width: 30,
    height: 30,
    backgroundColor: 'black',
    borderColor: 'blue',
    borderWidth: 3,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'rg',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: 'rgb(206, 203, 255)',
  },
  buttonClose: {
    marginTop: 25,
    backgroundColor: 'rgb(206, 203, 255)',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: 'black',
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default function App() {
  return(
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen}/>
      <Stack.Screen name="Board" component={Board}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
};