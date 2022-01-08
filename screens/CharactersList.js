import { View, Text } from 'react-native';
import styles from "../styles";
import React, { useState } from 'react';
import Grid from '../grid/Grid'; 
import ItemData from '../data/ItemData'; 
import Character from '../data/Character'; 
import {number, moveArrayItem} from '../grid/helpers'; 
import {REPOSITORY} from '../data/datatypes';

const SHOW_ADDED_CHARACTER = true;

const CharactersList = (props) => {

  const [characters, setCharacters] = useState(REPOSITORY.characters);
  const [index, setIndex] = useState(0);

  const addItem = new ItemData("Add");

  React.useEffect(() => {
    const data = props.route.params?.character;
    if(data) {
      const character = new Character();
      character.repository = REPOSITORY;
      console.log(character.repository);
      if(index<REPOSITORY.characters.length) {
        // copy variables from previosu version of the object 
        for (const key of Object.keys(characters[index])) {
          character[key] = characters[index];
        }
      }
      for (const key of Object.keys(data)) {
        character[key] = data[key];
      }
      if(index<REPOSITORY.characters.length) {
        setCharacters(characters.map((c, i)=>i==index ? character : c ));
      } else {
        // append a new character
        setCharacters([...characters, character]);
      }
      console.log(character);
      REPOSITORY.characters = characters;
    }
  }, [props.route.params?.character]);

  function itemHold(index){
    setIndex(index);
    props.navigation.navigate('CharacterEditor', {
      character:{...characters[index], repository:null}
    });
  }

  function itemClick(index){
    setIndex(index);
    if (index==REPOSITORY.characters.length){
      const character = new Character();
      props.navigation.navigate('CharacterEditor', {
        character : {...character, repository:null}
      });
    } else {
      props.navigation.navigate('Inventory');
    }
  }

  function onDrop(from, to) {
    setCharacters(state=>(number(moveArrayItem(state, from, to))));
    REPOSITORY.characters = characters;
  }

  return (<View style={styles.body}>
      <Text style={[styles.text, { fontSize: 30, marginTop: 10 }]}>Characters</Text>
      <Grid items={number([...characters, addItem])} 
            draggable={true} onDrop={onDrop}
            onHold={itemHold} onClick={itemClick}></Grid>
      <Text style={[styles.text, { fontSize: 17, marginBottom: 10 }]}>( Hold to edit )</Text>
      </View>);
}

export default CharactersList;