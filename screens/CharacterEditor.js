import React, {useState, Component} from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView, Image, Text, View, TextInput, Button, Alert } from "react-native";

class CharacterEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"",
      characterClass:"",
      level:"",
      specialization:"",
    }
    this._unsubscribe = props.navigation.addListener('focus', () => {
      const character = this.props.route?.params?.character;
      this.setState(state=>{
        if(character) {
          const newState = {...state};
          for (const key of Object.keys(character)) {
            newState[key]=character[key] || "";
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
      || !check("characterClass")
      || !check("level")
      || !check("specialization")
    ) return;

    Alert.alert(
      "Good job!",
      "Your character have been saved",
      [
        { text: "Got it!"}
      ]
    );

    this.props.navigation.navigate("CharactersList", {character:this.state});
  }

  render() {
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
        value={this.state.name}
        onChangeText={this.setField.bind(this, "name")}
        placeholderTextColor="#CCC"
      />
      <TextInput
        style={style.characterEditorInput}
        placeholder="Class"
        value={this.state.characterClass}
        onChangeText={this.setField.bind(this, "characterClass")}
        placeholderTextColor="#CCC"
      />
      <TextInput
        style={style.characterEditorInput}
        placeholder="Level"
        value={this.state.level}
        onChangeText={this.setField.bind(this, "level")}
        placeholderTextColor="#CCC"
      />
      <TextInput
        style={style.characterEditorInput}
        value={this.state.specialization}
        placeholder="Specialization"
        onChangeText={this.setField.bind(this, "specialization")}
        placeholderTextColor="#CCC"
      />

      <View style={style.characterEditorSaveButtonContainer}>
        <Button title={"Save"} onPress={this.onSubmit.bind(this)} color="#DCB66A" />
      </View>
    </SafeAreaView>
      
    </View>
  );
  }
};

export default CharacterEditor;