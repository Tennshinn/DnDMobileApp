import { View, Text } from 'react-native';
import styles from "../styles";
import React, { useState } from 'react';
import CreateCharacter from './CreateCharacter'; 
import Grid from '../grid/Grid'; 
import ItemData from '../data/ItemData'; 
import {number, dropItem} from '../grid/helpers'; 
import Inventory from './Inventory'; 
import {REPOSITORY, Character} from '../data/datatypes';

const SHOW_ADDED_CHARACTER = true;

const Characters = (props) => {

  const [characters, setCharacters] = useState(REPOSITORY.characters);
  const [index, setIndex] = useState(0);

  const addItem = new ItemData("Add");

  React.useEffect(() => {
    const data = props.route.params?.character;
    if(data) {
      const character = new Character();
      for (const key of Object.keys(characters[index])) {
        character[key] = characters[index];
      }
      for (const key of Object.keys(data)) {
        character[key] = data[key];
      }
      setCharacters(characters.map((c, i)=>i==index ? character : c ));
      REPOSITORY.characters = characters;
    }
  }, [props.route.params?.character]);

  function itemHold(index){
    setIndex(index);
    props.navigation.navigate('CreateCharacter', {
      character:REPOSITORY.characters[index],
      callback : ()=>setCharacters(REPOSITORY.characters)
    });
  }

  function itemClick(index){
    setIndex(index);
    if (index==REPOSITORY.characters.length){
      const character = new Character("", "", "", "")
      REPOSITORY.characters.push(character);
      props.navigation.navigate('CreateCharacter', {
        character : character
      });
    } else {
      props.navigation.navigate('Inventory');
    }
  }

  return (<View style={styles.body}>
      <Text style={[styles.text, { fontSize: 30, marginTop: 10 }]}>Characters</Text>
      <Grid items={number([...characters, addItem])} 
            onHold={itemHold} onClick={itemClick}></Grid>
      <Text style={[styles.text, { fontSize: 17, marginBottom: 10 }]}>( Hold to edit )</Text>
      </View>);
}

export default Characters;