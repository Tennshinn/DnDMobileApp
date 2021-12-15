import { View, FlatList, Text } from 'react-native';
import ItemDetails from './ItemDetails';
import styles from "../styles";
import React, { useState } from 'react';
import Grid from '../grid/Grid'; 
import ItemData from '../data/ItemData'; 
import {number, dropItem} from '../grid/helpers'; 

import LinearGradient from 'react-native-linear-gradient';

const DATA = [
  {
    id: "58694a0f-3da1-471f-bd96-14557asdsa11",
    title: "All",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Healing",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Attack",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Tricks",
  },
];

const Item = ({ item }) => (<View
  style={[styles.itemContainer, {marginHorizontal:8, width:70, height:132}]}
>
    <Text style={[styles.text, { fontSize: 14 }]} >{item.title}</Text></View>
);

export default function Inventory() {
    const initalItems = number(Array.from(
      {length:9}, 
      ()=>new ItemData("Healing Potion "+(Math.random().toString()).substring(0, 5))));
  
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

    const SHOW_PANEL_ICONS = true;
    
    return (
      <View style={styles.body}>
      {state.itemView && <ItemDetails onPress={closeItemView} name={selectedItem().name} image={selectedItem().image} description={selectedItem().description} icons={selectedItem().icons}/>}
      <Text style={[styles.text, { fontSize: 30, marginTop: 10 }]}>Healing</Text>
      <Grid items={state.items} onClick={itemClick} onDrop={dropItem.bind(null, setState)} >

      {SHOW_PANEL_ICONS &&
      <LinearGradient colors={['#00000000', '#000000', '#000000ff']} 
        style={{position:"absolute", bottom:28, width:"100%", height:250}}>
        <FlatList
        style={{position:"absolute", bottom:30}}
          contentContainerStyle={{alignItems: 'center', width:"100%", justifyContent: "center", display:"flex"}}
          data={DATA}
          renderItem={({item})=>(<Item item={item} />)}
          horizontal={true}
          keyExtractor={(item) => item.id}
        />
      </LinearGradient>}
      </Grid>
      
    </View>);
  }