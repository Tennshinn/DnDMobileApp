import React, {useState} from "react";
import { SafeAreaView, Image, StyleSheet, Text, View, TextInput, Dimensions, Button, Alert } from "react-native";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

const Packages= () => {

  const messagePrototype = () => {
    Alert.alert(
      "Event",
      "Event",
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
          <View style={{marginRight:10}}><Button style={styles.saveButtonInside} title={"EDIT"} onPress={messagePrototype} color="#DCB66A" /></View>
          <View style={{marginRight:10}}><Button style={styles.saveButtonInside} title={"DISABLE"} onPress={messagePrototype} color="#DCB66A" /></View>
          <View><Button style={styles.saveButtonInside} title={"REMOVE"} onPress={messagePrototype} color="#DCB66A" /></View>
          </View>
        </View>
      <View style={styles.saveButtonContainerLast}>
        <Button title={"Add New"} onPress={messagePrototype} color="#DCB66A" />
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
    backgroundColor: "#232323",
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:5,
    paddingRight:5,
    borderRadius:15,
  },
  saveButtonContainer: {
    marginTop:20,
    marginRight:20,
    width: ScreenWidth * 0.7,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flexDirection:"row",
  },
  saveButtonContainerLast: {
    marginTop:20,
    width: ScreenWidth * 0.7,
    alignItems: "flex-end",
  },
});

export default Packages;

