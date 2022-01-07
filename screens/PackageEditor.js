import React, {useState, Component} from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView, Image, Text, View, TextInput, Button, Alert } from "react-native";
import styles from "../styles";
import RectangularButton from "../shared/RectangularButton";

export default class PackageEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      link:""
    }
    this._unsubscribe = props.navigation.addListener('focus', () => {
      const $package = this.props.route?.params?.package;
      this.setState(state=>{
        if($package) {
          const newState = {...state};
          for (const key of Object.keys($package)) {
            newState[key]=$package[key] || "";
          }
          return newState;
        }
      });
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  setField(name, value) {
    this.setState(state=>({
      ...state,
      [name] : value
    }))
  }

  onSubmit() {
    const check = name=>{
      if(!this.state[name].trim()){
        Alert.alert(
          "Oups :(",
          `Please enter ${name}`,
          [
            { text: "Got it!"}
          ]
        );
        return false;
      }
      return true;
    }

    if (
      !check("name")
      || !check("link")
    ) return;

    Alert.alert(
      "Good job!",
      "Your package have been saved",
      [
        { text: "Got it!"}
      ]
    );

    this.props.navigation.navigate("Packages", {package:this.state});
  }

  render() {
  return (
    <View style={style.characterEditorWrapper}>
      <Text style={[style.characterEditorTitle, {paddingTop:30, paddingBottom:80}]}>Package Editor</Text>
    <SafeAreaView>
      <TextInput
        style={style.characterEditorInput}
        placeholder="Name"
        value={this.state.name}
        onChangeText={this.setField.bind(this, "name")}
        placeholderTextColor="#CCC"
      />
      <TextInput
        style={style.characterEditorInput}
        placeholder="Link"
        value={this.state.link}
        onChangeText={this.setField.bind(this, "link")}
        placeholderTextColor="#CCC"
      />   
    </SafeAreaView>  
      <Text style={[styles.text, {fontSize:12, paddingHorizontal:75, paddingTop:10, paddingBottom:50}]}>
      After you click save the text from the link will be dowloaded and evaluted as a package.{"\n"}
      Although the package language is severly limited, it is adviced you read through it and check for suspicios code and verify the author.{"\n\n"}
      Make sure that you're linking the raw, unstyled text and not a html page.
    </Text>

      <View style={style.characterEditorSaveButtonContainer}>
        <RectangularButton title={"Save"} onPress={this.onSubmit.bind(this)} style={{paddingHorizontal:15, paddingVertical:10, marginRight:0}} />
      </View>
      
    </View>
  );
  }
};