import { View, FlatList, Text, Dimensions, Modal, Pressable, TextInput } from 'react-native';
import ItemDetails from './ItemDetails';
import styles from "../styles";
import React, { useState, Component, Dime } from 'react';
import Grid from '../grid/Grid'; 
import ItemData from '../data/ItemData'; 
import { Panel } from '../data/datatypes'; 
import {number, dropItem} from '../grid/helpers'; 

import LinearGradient from 'react-native-linear-gradient';

const Item = ({ item }) => (<View
  style={[styles.itemContainer, {marginHorizontal:8, width:70, height:132}]}
>
    <Text style={[styles.text, { fontSize: 14 }]} >{item.title}</Text></View>
);

class PanelNameEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open:false, 
      text:""
    };
  }
  open(text) {
    this.setState({open:true, text:text});

  }
  close() {
    this.props.onAccept(this.state.text);
    this.setState({open:false});
  }
  render() {
  return <Modal
    animationType="slide"
    transparent={true}
    visible={this.state.open}
    onRequestClose={() => this.close()}>
    <View style={[styles.body, { margin: 45, top:140,
    padding: 35, height:200}]}>
      <View >
        <Text style={[styles.text, { textAlign:"left", fontSize: 25, marginBottom: 15, marginLeft:2, opacity:0.8 }]}>Set panel name</Text>
        <TextInput
        style={[styles.text, {textAlign:"left", fontSize:30, marginBottom: 10 }]}
        placeholder="Panel Name"
        placeholderTextColor="#CCC"
        value={this.state.text}
        onChangeText={text=>this.setState({...this.state, text:text})}
      />
      <Pressable onPress={()=>this.close()}>
        <Text style={[styles.text, { textAlign:"right"}]}>OK</Text>
      </Pressable>
      </View>
    </View>
  </Modal>
}
}

export default function Inventory() {
    const initalItems = number(Array.from(
      {length:9}, 
      ()=>new ItemData("Healing Potion "+(Math.random().toString()).substring(0, 5))));

    const initialPanels = number(Array.from(
        {length:5}, 
        ()=>new Panel("Healing", initalItems)));
  
    const [state, setState] = useState({
      items:initalItems,
      panels:initialPanels,
      selectedPanel:0,
      itemView:false,
      selectedItem:0,
      editing:true,
      dragging:false,
      title:"Healing"
    });

    function onDragEnd(index, x, y) {
      setDragging(false);
      const panelWidth = Dimensions.get('window').width / state.panels.length;
      const panel = Math.round(x / panelWidth);
      const item = state.panels[state.selectedPanel].itemIds.find(e=>e && e.index==index);
      if (item) {
        state.panels[state.selectedPanel].itemIds = state.panels[state.selectedPanel].itemIds.filter(e=>!e || e.index!=index);
        state.panels[panel].itemIds.push(item);
        return true;
      }
    }

    function setDragging(dragging) {
      setState({...state, dragging:dragging});
    }
  
    function closeItemView(){
      setState({...state, itemView:false});
    }
  
    function itemClick(index){
      setState({...state, selectedItem:index, itemView:true});
    }

    function switchEditing(){
      setState({...state, editing:!state.editing});
    }
  
    function selectedItem(){
      return state.items[state.selectedItem];
    }

    function setTitle(title) {
      setState({...state, title:title});
    }

    const panelNameEdit = React.createRef();
    
    return (
      <View style={styles.body}>
      {state.itemView && <ItemDetails onPress={closeItemView} name={selectedItem().name} image={selectedItem().image} 
                                      description={selectedItem().description} icons={selectedItem().icons}/>}
      
      <Pressable onPress={()=>panelNameEdit.current?.open(state.title)}>
        <Text style={[styles.text, { fontSize: 30, marginTop: 10 }]}>{state.title=="" ? "---" : state.title}</Text>
      </Pressable>
      <Pressable onPress={switchEditing} >
        <Text style={[styles.text, { fontSize: 25, position:"absolute", bottom:0, right:20, opacity: (state.editing ? 0.5 : 1), transform:[{rotateZ:"7deg"}]}]}>
          { state.editing ? "<View" : ">Edit"}
          </Text>
      </Pressable>
      <Grid items={state.items} onClick={itemClick} onDrop={dropItem.bind(null, setState)} draggable={state.editing} onDragStart={_=>setDragging(true)}  
        onDragEnd={onDragEnd} >
      <PanelNameEdit ref={panelNameEdit} onAccept={setTitle} />

      {state.dragging &&
      <LinearGradient colors={['#00000000', '#000000', '#000000ff']} 
        style={{position:"absolute", bottom:28, width:"100%", height:250}}>
        <FlatList
        style={{position:"absolute", bottom:30}}
          contentContainerStyle={{alignItems: 'center', width:"100%", justifyContent: "center", display:"flex"}}
          data={state.panels.map(p=>({title:p.name, key:p.index}))}
          renderItem={({item})=>(<Item item={item} />)}
          horizontal={true}
          keyExtractor={(item) => item.id}
        />
      </LinearGradient>}
      </Grid>
      
    </View>);
  }