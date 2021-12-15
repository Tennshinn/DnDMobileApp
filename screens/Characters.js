import { View, Text } from 'react-native';
import styles from "../styles";
import React, { useState } from 'react';
import CreateCharacter from './CreateCharacter'; 
import Grid from '../grid/Grid'; 
import ItemData from '../data/ItemData'; 
import {number, dropItem} from '../grid/helpers'; 
import Inventory from './Inventory'; 

const Characters = () => {
  const initalItems = number(Array.from(
    {length:9}, 
    ()=>new ItemData("John "+(Math.random().toString()).substring(0, 5))));

  const [state, setState] = useState({
    items:initalItems,
    inventory:false,
    characterEditor:false,
    selectedCharacter:0
  });

  function itemHold(index){
    setState({...state, selectedCharacter:index, characterEditor:true});
  }

  function itemClick(index){
    setState({...state, selectedCharacter:index, inventory:true});
  }

  return (<View>
    {state.characterEditor && <CreateCharacter/>}
    {state.inventory && <Inventory/>}
    {(!state.characterEditor && !state.inventory)
    && <View style={styles.body}>
      <Text style={[styles.text, { fontSize: 30, marginTop: 10 }]}>Characters</Text>
      <Grid items={state.items} onDrop={dropItem.bind(null, setState)} onHold={itemHold} onClick={itemClick}></Grid>
      <Text style={[styles.text, { fontSize: 17, marginBottom: 10 }]}>( Hold to edit )</Text>
      </View>
    }
  </View>);
}

export default Characters;