import { View, Text } from 'react-native';
import styles from "../styles";
import React, { useState } from 'react';
import Grid from '../grid/Grid'; 
import ItemData from '../data/ItemData'; 
import Character from '../data/Character'; 
import {number, moveArrayItem} from '../grid/helpers'; 
import {REPOSITORY} from '../data/Repository';
import CircleButton from "../shared/CircleButton";

const SHOW_ADDED_CHARACTER = true;

const CharactersList = (props) => {

  const [characters, setCharacters] = useState(REPOSITORY.characters);
  const [index, setIndex] = useState(0);

  const addItem = new ItemData("Add");

  React.useEffect(() => {
    const data = props.route.params?.character;
    if(data) {
      const character = new Character();
      if(index<REPOSITORY.characters.length) {
        // copy variables from previosu version of the object 
        for (const key of Object.keys(characters[index])) {
          character[key] = characters[index];
        }
      }
      for (const key of Object.keys(data)) {
        character[key] = data[key];
      }
      character.repository = REPOSITORY;
      
      if(index<REPOSITORY.characters.length) {
        setCharacters(characters.map((c, i)=>i==index ? character : c ));
      } else {
        // append a new character
        setCharacters([...characters, character]);
      }
      REPOSITORY.characters = characters;
    }
  }, [props.route.params?.character]);

  function itemHold(index){
    setIndex(index);
    props.navigation.navigate('CharacterEditor', {
       // set repository to null to avoid cyclical reference warning
      character:{...characters[index], repository:null},
      characterClasses : REPOSITORY.classes
    });
  }

  function itemClick(index){
    setIndex(index);
    props.navigation.navigate('Inventory');
  }

  function newCharacter() {
    setIndex(characters.length);
    const character = new Character();
    props.navigation.navigate('CharacterEditor', {
      character : {...character, repository:null},
      characterClasses : REPOSITORY.classes
    });
  }

  function onDrop(from, to) {
    setCharacters(state=>(number(moveArrayItem(state, from, to))));
    REPOSITORY.characters = characters;
  }

  return (<View style={styles.body}>
      <Text style={[styles.text, { fontSize: 30, marginTop: 10 }]}>Characters</Text>
      <Grid items={number(characters)} 
            draggable={true} onDrop={onDrop}
            onHold={itemHold} onClick={itemClick}></Grid>
      <Text style={[styles.text, { fontSize: 17, textAlign:"center", width:"100%", bottom: 15, position:"absolute" }]}>( Hold to edit )</Text>
      <CircleButton visible={characters.length<9} title="ADD" onPress={newCharacter}></CircleButton>
      </View>);
}

export default CharactersList;