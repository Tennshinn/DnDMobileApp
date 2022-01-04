import React from "react";
import { Text, View, Button, Alert } from "react-native";
import style from "../styles/style";

const Packages= ({navigation}) => {

  const messagePrototype = () => {
    Alert.alert(
      "Event",
      "Event",
      [
        { text: "Got it!"}
      ]
    );
  }

  const editPackage = () => {
    navigation.navigate('PackageEditor');
  }

  return (
    <View style={style.packagesWrapper}>
      <Text style={style.packagesTitle}>Packages</Text>
        <View style={style.packagesRow}>
          <Text style={style.packagesRowHeader}>Underworld Races Expansion</Text>
          <Text style={style.packagesRowLink}>https://pastebin.com/raw/example</Text>
          <View style={style.packagesButtonInsideRow}>
          <View style={{marginRight:10}}><Button style={style.packagesButtonInsideRow} title={"EDIT"} onPress={messagePrototype} color="#DCB66A" /></View>
          <View style={{marginRight:10}}><Button style={style.packagesButtonInsideRow} title={"DISABLE"} onPress={messagePrototype} color="#DCB66A" /></View>
          <View><Button style={style.packagesButtonInsideRow} title={"REMOVE"} onPress={messagePrototype} color="#DCB66A" /></View>
          </View>
        </View>
      <View style={style.packagesSaveButton}>
        <Button title={"Add New"} onPress={editPackage} color="#DCB66A" />
      </View>
    </View>
  );
};

export default Packages;

