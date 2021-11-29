import React, {useState} from "react";
import { SafeAreaView, Image, StyleSheet, Text, View, TextInput, Dimensions, Button, Alert, ScrollView } from "react-native";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

const ItemEditor= ({navigation}) => {
  const [textInputName, setTextInputName] = useState('');
  const [TextInputDescription, setTextInputDescription] = useState('');
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
    
    if(!TextInputDescription.trim()){
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
    <View style={styles.characterEditor}>
    <ScrollView>
      <Text style={styles.topText}>Item Editor</Text>
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
        style={styles.inputDescription}
        placeholder="Description"
        onChangeText={(value) => setTextInputDescription(value)}
        placeholderTextColor="#CCC"
        multiline={true}
        numberOfLines={3}
      />
      <TextInput
        style={styles.input}
        placeholder="Tags, ex: #weapons #heavy"
        onChangeText={(value) => setTextInputTag(value)}
        placeholderTextColor="#CCC"
      />
      <View style={styles.saveButtonContainer}>
        <Button title={"Save"} onPress={checkTextInput} color="#DCB66A" />
      </View>
    </SafeAreaView>
    </ScrollView>
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
    color:"#FFF",
    fontSize:16,
  },
  inputDescription: {
    width: ScreenWidth * 0.7,
    margin: 8,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor:"#3B3B3B",
    color:"#FFF",
    fontSize:16,
  },
  saveButtonContainer: {
    marginTop:20,
    width: ScreenWidth * 0.7,
    justifyContent: "center",
    alignItems: "flex-end",
  },
});

export default ItemEditor;

