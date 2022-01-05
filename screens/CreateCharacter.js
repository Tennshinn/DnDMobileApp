import React, {useState} from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView, Image, Text, View, TextInput, Button, Alert } from "react-native";

const CreateCharacter= ({route, navigation}) => {
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

    const character = route.params.character;
    for (const key of Object.keys(character)) {
      character[key] = ""; // state[key]
    }
    navigation.goBack();
  }

  return (
    <View style={style.characterEditorWrapper}>
      <Text style={style.characterEditorTitle}>Character Editor</Text>
      <Image
        style={style.characterEditorAddImage}
        source={require('../img/addImage.png')} />
        
    <SafeAreaView>
      <TextInput
        style={style.characterEditorInput}
        placeholder="Name"
        onChangeText={(value) => setTextInputName(value)}
        placeholderTextColor="#CCC"
      />
      <TextInput
        style={style.characterEditorInput}
        placeholder="Class"
        onChangeText={(value) => setTextInputClass(value)}
        placeholderTextColor="#CCC"
      />
      <TextInput
        style={style.characterEditorInput}
        placeholder="Level"
        onChangeText={(value) => setTextInputLevel(value)}
        placeholderTextColor="#CCC"
      />
      <TextInput
        style={style.characterEditorInput}
        placeholder="Specialization"
        onChangeText={(value) => setTextInputSpecialization(value)}
        placeholderTextColor="#CCC"
      />

      <View style={style.characterEditorSaveButtonContainer}>
        <Button title={"Save"} onPress={checkTextInput} color="#DCB66A" />
      </View>
    </SafeAreaView>
      
    </View>
  );
};

export default CreateCharacter;