import React, {useState} from "react";
import { SafeAreaView, Image, StyleSheet, Text, View, TextInput, Dimensions, Button, Alert } from "react-native";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

const CreateCharacter= ({navigation}) => {
  const [textInputName, setTextInputName] = useState('');
  const [textInputClass, setTextInputClass] = useState('');
  const [textInputLevel, setTextInputLevel] = useState('');
  const [textInputSpecialization, setTextInputSpecialization] = useState('');

  const checkTextInput = () => {
    if(!textInputName.trim()){
      Alert.alert(
        "Oups :(",
        "Please enter name",
        [
          { text: "Got it!"}
        ]
      );
      return;
    }
    
    if(!textInputClass.trim()){
      Alert.alert(
        "Oups :(",
        "Please enter class",
        [
          { text: "Got it!"}
        ]
      );
      return;
    }

    if(!textInputLevel.trim()){
      Alert.alert(
        "Oups :(",
        "Please enter Level",
        [
          { text: "Got it!"}
        ]
      );
      return;
    }

    if(!textInputSpecialization.trim()){
      Alert.alert(
        "Oups :(",
        "Please enter specialization",
        [
          { text: "Got it!"}
        ]
      );
      return;
    }

    Alert.alert(
      "Good job!",
      "Your character have been saved",
      [
        { text: "Got it!"}
      ]
    );

    navigation.navigate('ItemEditor');
  }

  return (
    <View style={styles.characterEditor}>
      <Text style={styles.topText}>Character Editor</Text>
      <Image
        style={styles.addImage}
        source={require('../img/addImage.png')} />

    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(value) => setTextInputName(value)}
        placeholderTextColor="#CCC"
      />
      <TextInput
        style={styles.input}
        placeholder="Class"
        onChangeText={(value) => setTextInputClass(value)}
        placeholderTextColor="#CCC"
      />
      <TextInput
        style={styles.input}
        placeholder="Level"
        onChangeText={(value) => setTextInputLevel(value)}
        placeholderTextColor="#CCC"
      />
      <TextInput
        style={styles.input}
        placeholder="Specialization"
        onChangeText={(value) => setTextInputSpecialization(value)}
        placeholderTextColor="#CCC"
      />

      <View style={styles.saveButtonContainer}>
        <Button title={"Save"} onPress={checkTextInput} color="#DCB66A" />
      </View>
    </SafeAreaView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  characterEditor: {
    backgroundColor: "#000",
    justifyContent: "flex-start",
    alignItems: 'center',
    height: ScreenHeight,
  },
  topText: {
    textAlign:"center",
    fontSize:38,
    color: "#EFD4AD",
    marginTop:5,
  },
  addImage: {
    height: ScreenHeight * 0.25,
    width: ScreenWidth * 0.7,
    marginTop:15,
    marginBottom:15,
    resizeMode:"contain",
  },
  input: {
    height: ScreenHeight * 0.08,
    width: ScreenWidth * 0.7,
    margin: 8,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor:"#3B3B3B",
    color:"#CCC",
    fontSize:16,
  },
  saveButtonContainer: {
    marginTop:20,
    width: ScreenWidth * 0.7,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

export default CreateCharacter;

