import React, {useState} from "react";
import { SafeAreaView, Image, Text, View, TextInput, Button, Alert, ScrollView } from "react-native";
import style from "../styles/style";

const ItemEditor= ({navigation}) => {
  const [textInputName, setTextInputName] = useState('');
  const [textInputDescription, setTextInputDescription] = useState('');
  const [textInputTag, setTextInputTag] = useState('');

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
    
    if(!textInputDescription.trim()){
      Alert.alert(
        "Oups :(",
        "Please enter description",
        [
          { text: "Got it!"}
        ]
      );
      return;
    }

    if(!textInputTag.trim()){
      Alert.alert(
        "Oups :(",
        "Please enter Tag",
        [
          { text: "Got it!"}
        ]
      );
      return;
    }

    Alert.alert(
      "Good job!",
      "Your item have been saved",
      [
        { text: "Got it!"}
      ]
    );
  }

  return (
    <View style={style.itemEditorWrapper}>
    <ScrollView>
      <Text style={style.itemEditorTitle}>Item Editor</Text>
      <Image
        style={style.itemEditorAddImage}
        source={require('../img/addImage.png')} />
    <SafeAreaView>
      <TextInput
        style={style.itemEditorInput}
        placeholder="Name"
        onChangeText={(value) => setTextInputName(value)}
        placeholderTextColor="#CCC"
      />
      <TextInput
        style={style.itemEditorInputDescription}
        placeholder="Description"
        onChangeText={(value) => setTextInputDescription(value)}
        placeholderTextColor="#CCC"
        multiline={true}
        numberOfLines={3}
      />
      <TextInput
        style={style.itemEditorInput}
        placeholder="Tags, ex: #weapons #heavy"
        onChangeText={(value) => setTextInputTag(value)}
        placeholderTextColor="#CCC"
      />
      <View style={style.itemEditorSaveButtonContainer}>
        <Button title={"Save"} onPress={checkTextInput} color="#DCB66A" />
      </View>
    </SafeAreaView>
    </ScrollView>
    </View>
  );
};

export default ItemEditor;

