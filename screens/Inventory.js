import { View, Image, Text } from 'react-native';
import ItemDetails from './ItemDetails';
import styles from "../styles";
import React, { useState } from 'react';
import Grid from '../grid/Grid'; 
import ItemData from '../data/ItemData'; 
import {number, dropItem} from '../grid/helpers'; 

export default function Inventory() {
    const initalItems = number(new Array(9).fill(new ItemData())
    .map((value, index)=>({...value, name:value.name+` ${index}`})
    ));
  
    const [state, setState] = useState({
      items:initalItems,
      itemView:false,
      selectedItem:0
    });
  
    function closeItemView(){
      setState({...state, itemView:false});
    }
  
    function itemClick(index){
      setState({...state, selectedItem:index, itemView:true});
    }
  
    function selectedItem(){
      return state.items[state.selectedItem];
    }
    
    return (
      <View style={styles.body}>
      {state.itemView && <ItemDetails onPress={closeItemView} name={selectedItem().name} image={selectedItem().image} description={selectedItem().description}/>}
      <Text style={[styles.text, { fontSize: 30, marginTop: 10 }]}>Healing</Text>
      <Grid items={state.items} onClick={itemClick} onDrop={dropItem.bind(null, setState)} ></Grid>
    </View>);
  }