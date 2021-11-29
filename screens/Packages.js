import React, {useState} from "react";
import { SafeAreaView, Image, StyleSheet, Text, View, TextInput, Dimensions, Button, Alert } from "react-native";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

const createItem= () => {
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
      "Your character have been saved",
      [
        { text: "Got it!"}
      ]
    );
  }

  return (
    <View style={styles.packages}>
      <Text style={styles.topText}>Packages</Text>
        <View style={styles.packagesRow}>
          <Text style={styles.packagesRowHeader}>Underworld Races Expansion</Text>
          <Text style={styles.packagesRowLink}>https://pastebin.com/raw/example</Text>
          <View style={styles.saveButtonContainer}>
            <Button style={styles.saveButtonInside} title={"EDIT"} onPress={checkTextInput} color="#DCB66A" />
            <Button style={styles.saveButtonInside} title={"DISABLE"} onPress={checkTextInput} color="#DCB66A" />
            <Button style={styles.saveButtonInside} title={"REMOVE"} onPress={checkTextInput} color="#DCB66A" />
          </View>
        </View>
      <View style={styles.saveButtonContainerLast}>
        <Button title={"Add New"} onPress={checkTextInput} color="#DCB66A" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  packages: {
    backgroundColor: "#000",
    justifyContent: "flex-start",
    alignItems: 'center',
    height: ScreenHeight,
  },
  packagesRowHeader:{
    fontSize:20,
    color: "#EFD4AD",
    marginBottom:5,
  },
  packagesRowLink:{
    fontSize:16,
    color: "#EFD4AD",
  },
  topText: {
    textAlign:"center",
    fontSize:38,
    color: "#EFD4AD",
    marginTop:25,
  },
  packagesRow: {
    width:ScreenWidth * 0.8,
    backgroundColor: "#888",
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:5,
    paddingRight:5,
  },
  saveButtonContainer: {
    marginTop:20,
    width: ScreenWidth * 0.7,
    justifyContent: "flex-end",

    alignItems: "flex-end",
    flexDirection:"row",
  },
  saveButtonContainerLast: {
    marginTop:20,
    width: ScreenWidth * 0.7,
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  saveButtonInside: {
    marginLeft:10,
  },
});

export default createItem;

