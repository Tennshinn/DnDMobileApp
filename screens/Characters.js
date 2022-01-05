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
  const initalItems = number(Array.from(
    {length:7}, 
    ()=>new ItemData("John "+(Math.random().toString()).substring(0, 5))));

  const addItem = new ItemData("Add");
  addItem.index = initalItems.length;

  const [state, setState] = useState({
    items:initalItems,
    inventory:false
  });

  function itemHold(index){
    console.log(REPOSITORY)
    props.navigation.navigate('CreateCharacter', {
      character:REPOSITORY.characters[index]
    });
    setState({...state});
  }

  function itemClick(index){
    if (index==initalItems.length){
      const character = new Character("", "", "", "")
      REPOSITORY.characters.push(character);
      props.navigation.navigate('CreateCharacter', {
        character : character
      });
      setState({...state, items:[...state.items, new ItemData("John")]});
    } else {
      props.navigation.navigate('Inventory');
    }
  }

  return (<View style={styles.body}>
      <Text style={[styles.text, { fontSize: 30, marginTop: 10 }]}>Characters</Text>
      <Grid items={[...state.items, addItem]} 
            onHold={itemHold} onClick={itemClick}></Grid>
      <Text style={[styles.text, { fontSize: 17, marginBottom: 10 }]}>( Hold to edit )</Text>
      </View>);
}

export default Characters;