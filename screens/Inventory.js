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

function HorizontalDraggingWrapper({children, dragBorder, onMoved, draggable, dragAllowed}) {

  const [offsetX, setOffsetX] = useState(0);
  const [startX, setStartX] = useState(0);
  const [x, setX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const view = React.createRef();

  const dragAmount = ()=>x-startX;

  function dragStart(event){
    setDragging(true);
    setStartX(event.nativeEvent.pageX);
    setX(event.nativeEvent.pageX);
  }
  function dragMove(event){
    if(!dragAllowed || dragAllowed(Math.sign(event.nativeEvent.pageX-startX))) {
      setX(event.nativeEvent.pageX);
    }
  }
  function dragEnd(){
    if (Math.abs(dragAmount())>=dragBorder && onMoved){
      onMoved(Math.sign(dragAmount()));
    }
    setDragging(false);
    setStartX(0);
    setX(0);
  }
  function onLayout() {
    if(!dragging)
      view.current.measure( (fx, fy, width, height, pageX, pageY) => {
        if(!dragging)
          setOffsetX(pageX);
      });
  }
  
  return <View
      ref={view}
      style={{
        position:'absolute',
        opacity:1-Math.abs(dragAmount())/dragBorder,
        height: "100%",
        transform: [
          {translateX:(offsetX??0)+dragAmount() },
          {scale:1-Math.abs(dragAmount())/dragBorder/20 }
        ]
      }}
      onResponderStart={dragStart}
      onResponderMove={dragMove}
      onResponderRelease={dragEnd}
      onStartShouldSetResponderCapture={
        (evt) => false
      }
      onStartShouldSetResponder={() => draggable}
      onResponderTerminationRequest={() => true}
      onResponderTerminate={() => true}
      onLayout={onLayout} >
        {children}
      </View>  
}

export default function Inventory({navigation}) {
    const initalItems = number(Array.from(
      {length:9}, 
      ()=>new ItemData("Healing Potion "+(Math.random().toString()).substring(0, 5))));

    const initialPanels = number(Array.from(
        {length:5}, 
        ()=>new Panel("Healing "+(Math.random().toString()).substring(2, 4), initalItems)));
  
    const [state, setState] = useState({
      items:initalItems,
      panels:initialPanels,
      selectedPanel:0,
      editing:true,
      dragging:false,
      title:"Healing"
    });

    function onDragEnd(index, x, y) {
      setDragging(false);
      /*
      const panelWidth = Dimensions.get('window').width / state.panels.length;
      const panel = Math.round(x / panelWidth);
      const item = state.panels[state.selectedPanel].itemIds.find(e=>e && e.index==index);
      if (item) {
        state.panels[state.selectedPanel].itemIds = state.panels[state.selectedPanel].itemIds.filter(e=>!e || e.index!=index);
        state.panels[panel].itemIds.push(item);
        return true;
      }
      */
    }

    function setDragging(dragging) {
      setState({...state, dragging:dragging});
    }
  
    function itemClick(index){
      const item=state.items[index];
      navigation.navigate("ItemDetails", {
        name:item.name,
        image:item.getImage(),
        description:item.description,
        icons:item.icons,
        color:item.getColor()
      });
    }

    function switchEditing(){
      setState({...state, editing:!state.editing});
    }
    
    function setTitle(title) {
      setState({...state, title:title});
    }

    function panelExists(panel) {
      return panel>=0 && panel<state.panels.length;
    }

    const panelNameEdit = React.createRef();
    
    return (
      <View style={styles.body}>
        <View style={{elevation:100, zIndex:100,}}>
      <Pressable onPress={switchEditing} >
        <Text style={[styles.text, { fontSize: 25, elevation:100, zIndex:100,
          position:"absolute", right:15, top:15, opacity: (state.editing ? 0.5 : 1), transform:[{rotateZ:"7deg"}]}]}>
          { state.editing ? "<View" : ">Edit"}
          </Text>
      </Pressable>
      </View>
      <HorizontalDraggingWrapper 
        draggable={!state.editing}
        dragBorder={120}
        onMoved={(direction)=>{
          const newPanel = state.selectedPanel+direction;
          if(panelExists(newPanel)) {
            setState({...state, selectedPanel:newPanel});
          }
        }}
        dragAllowed={direction=>panelExists(state.selectedPanel+direction)}
      >
      <Pressable onPress={()=>panelNameEdit.current?.open(state.title)}>
        <Text style={[styles.text, { fontSize: 30, marginTop: 10 }]}>{state.panels[state.selectedPanel].name || "---"}</Text>
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
          data={number(state.panels).map(p=>({title:p.name}))}
          renderItem={({item})=>(<Item item={item} key={item.index} />)}
          horizontal={true}
          keyExtractor={(item) => item.id}
        />
      </LinearGradient>}
      </Grid>
      </HorizontalDraggingWrapper>
      
    </View>);
  }