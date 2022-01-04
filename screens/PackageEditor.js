import React, {useState} from "react";
import { SafeAreaView, Image, Text, View, TextInput, Button, Alert } from "react-native";
import style from "../styles/style";

const PackageEditor= () => {
  const [textInputName, setTextInputName] = useState('');
  const [textInputLink, setTextInputLink] = useState('');

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
    
    if(!textInputLink.trim()){
      Alert.alert(
        "Oups :(",
        "Please enter link",
        [
          { text: "Got it!"}
        ]
      );
      return;
    }
    
    Alert.alert(
      "Good job!",
      "Your package have been saved",
      [
        { text: "Got it!"}
      ]
    );
  }

  return (
    <View style={style.packageEditorWrapper}>
      <Text style={style.packageEditorTitle}>Package Editor</Text>
      <Image
        style={style.packageEditorAddImage}
        source={require('../img/addImage.png')} />
        
    <SafeAreaView>
      <TextInput
        style={style.packageEditorInput}
        placeholder="Name"
        onChangeText={(value) => setTextInputName(value)}
        placeholderTextColor="#CCC"
      />
      <TextInput
        style={style.packageEditorInput}
        placeholder="Link"
        onChangeText={(value) => setTextInputLink(value)}
        placeholderTextColor="#CCC"
      />

      <View style={style.packageEditorSaveButtonContainer}>
        <Button title={"Save"} onPress={checkTextInput} color="#DCB66A" />
      </View>
    </SafeAreaView>
      
    </View>
  );
};

export default PackageEditor;