import { View, FlatList, Text } from 'react-native';
import ItemDetails from './ItemDetails';
import styles from "../styles";
import React, { useState } from 'react';
import Grid from '../grid/Grid'; 
import ItemData from '../data/ItemData'; 
import {number, dropItem} from '../grid/helpers'; 

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Attack",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Healing",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Tricks",
  },
  {
    id: "58694a0f-3da1-471f-bd96-14557asdsa11",
    title: "Other",
  },
];

const Item = ({ item }) => (<View
  style={[styles.itemContainer, {marginHorizontal:8, width:80}]}
>
    <Text style={[styles.text, { fontSize: 15 }]} >{item.title}</Text></View>
);

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
      <FlatList
        style={{position:"absolute", bottom:0, width:"100%"}}
        contentContainerStyle={{alignItems: 'center', width:"100%", justifyContent: "center", display:"flex"}}
        data={DATA}
        renderItem={({item})=>(<Item item={item} />)}
        horizontal={true}
        keyExtractor={(item) => item.id}
      />
    </View>);
  }