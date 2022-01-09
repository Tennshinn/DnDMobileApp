import React, { useState, Component } from "react";
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView, Image, Text, View, TextInput, Button, Alert } from "react-native";
import RectangularButton from "../shared/RectangularButton";

class CharacterEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      characterClass: "",
      characterClassOpen: "",
      level: "",
      levelOpen: false,
      specialization: "",
      specializationOpen: "",
      characterClasses: []
    }
    this._unsubscribe = props.navigation.addListener('focus', () => {
      const character = this.props.route?.params?.character;
      this.setState(state => {
        const newState = { ...state };
        newState.characterClasses = this.props.route?.params?.characterClasses ?? [];
        if (character) {
          for (const key of Object.keys(character)) {
            newState[key] = character[key] || "";
          }
        }
        return newState;
      });
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  setField(name, value) {
    // console.log(name, value);
    this.setState(state => ({
      ...state,
      [name]: value
    }))
  }

  onSubmit() {
    const check = name => {
      if (!this.state[name].trim()) {
        Alert.alert(
          "Oups :(",
          `Please enter ${name}`,
          [
            { text: "Got it!" }
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
    ) return;

    Alert.alert(
      "Good job!",
      "Your character have been saved",
      [
        { text: "Got it!" }
      ]
    );

    this.props.navigation.navigate("CharactersList", { character: this.state });
  }

  getSpecializations() {
    return ["", ...(this.state.characterClasses?.find(e=>e.name==this.state.characterClass)?.specializations ?? [])];
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
          <DropDownPicker
            theme="DARK"
            listMode="MODAL"
            style={style.characterEditorInput}
            modalContentContainerStyle={{
              backgroundColor: style.characterEditorInput.backgroundColor
            }}
            dropDownContainerStyle={{
              backgroundColor: style.characterEditorInput.backgroundColor,
              width: style.characterEditorInput.width, left: 7,
              elevation : 1000,
              zIndex : 1000
            }}
            open={this.state.characterClassOpen}
            value={this.state.characterClass}
            items={this.state.characterClasses.map(e=>({label : e.name, value:e.name}))}
            setOpen={this.setField.bind(this, "characterClassOpen")}
            setValue={value => {
               this.setState(state=>({...state, characterClass: value(), specialization:""}));
            }}
            placeholder="Class"
          />
          <DropDownPicker
            theme="DARK"
            listMode="MODAL"
            style={style.characterEditorInput}
            modalContentContainerStyle={{
              backgroundColor: style.characterEditorInput.backgroundColor
            }}
            dropDownContainerStyle={{
              backgroundColor: style.characterEditorInput.backgroundColor,
              width: style.characterEditorInput.width, left: 7,
              elevation : 1000,
              zIndex : 1000
            }}
            open={this.state.levelOpen}
            value={this.state.level}
            items={[1, 2, 3, 4, 5].map(e => ({ label: "Level " + e, value: e.toString() }))}
            setOpen={this.setField.bind(this, "levelOpen")}
            setValue={value => this.setField("level", value())}
            placeholder="Level"
          />
          <DropDownPicker
            theme="DARK"
            listMode="MODAL"
            style={style.characterEditorInput}
            modalContentContainerStyle={{
              backgroundColor: style.characterEditorInput.backgroundColor
            }}
            dropDownContainerStyle={{
              backgroundColor: style.characterEditorInput.backgroundColor,
              width: style.characterEditorInput.width, left: 7,
              elevation : 1000,
              zIndex : 1000
            }}
            open={this.state.specializationOpen}
            value={this.state.specialization}
            items={this.getSpecializations().map(e => ({ label: e || "No Specialization", value: e }))}
            setOpen={this.setField.bind(this, "specializationOpen")}
            setValue={value => this.setField("specialization", value())}
            placeholder="Specialization"
          />

          <View style={style.characterEditorSaveButtonContainer}>
            <RectangularButton title={"Save"} onPress={this.onSubmit.bind(this)} style={{ paddingHorizontal: 15, paddingVertical: 10, marginRight: -10 }} />
          </View>
        </SafeAreaView>

      </View>
    );
  }
};

export default CharacterEditor;