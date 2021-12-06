import { View, Image, Text } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import styles from "./styles";
import React, { Component, useState } from 'react';
import ItemView from './ItemView';
import CreateCharacter from './CreateCharacter'; 

const HOLD_TIME = 800;
const DRAG_DELTA = 10;

class ItemData {
  constructor(name, image, description, icons) {
    this.name = name ?? "Health Potion";
    this.image = image ?? require('./img/fire-bowl.png');
    this.description = description ?? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates dolorem molestiae necessitatibus quod. Veniam facere nobis recusandae repudiandae iste voluptas minima aut repellendus nihil quis exercitationem quas, inventore iusto. Minima?";
    this.icons = icons ?? "4⚅     2⚂";
  }
}

class Item extends Component {
  constructor(props) {
    super(props);
    console.log(props.index);
    this.state = {
      startX:0,
      startY:0,
      x:0,
      y:0,
      dragging:false,
      dragStart:0,
      message:""
    }
  }

  dragStart  = (event) => {
    if(!this.state.dragging)
      this.setState({
        startX:event.nativeEvent.pageX,
        startY:event.nativeEvent.pageY,
        dragging:false,
        x:0,
        y:0,
        dragStart: Date.now()
      });
  }

  distance(ax, ay, bx, by){
    const dx=bx-ax;
    const dy=by-ay;
    return Math.sqrt(dx*dx+dy*dy);
  }

  dragMove  = (event) => {
    const x=event.nativeEvent.pageX-this.state.startX;
    const y=event.nativeEvent.pageY-this.state.startY;
    this.setState({
      startX:this.state.startX,
      startY:this.state.startY,
      x:x,
      y:y,
      dragging:this.state.dragging || Math.sqrt(x*x+y*y)>DRAG_DELTA,
     });
  }

  callback(f, ...args){
    if(f) f(...args);
  } 

  dragEnd  = (event) => {
    const header_size=40;
    const row_length=3;
    const y=Math.floor((event.nativeEvent.pageY-header_size)/styles.itemContainer.height);
    const x=Math.floor(event.nativeEvent.pageX/styles.itemContainer.height);
    const index=y*row_length+x;

    if (!this.state.dragging){
      if (Date.now()-this.state.dragStart>=HOLD_TIME){
          this.callback(this.props.onHold);
          console.log("hold "+this.props.index);
      }
      else {
        this.callback(this.props.onClick);
        console.log("click "+this.props.index);
      }
    } else if(index!=this.props.index) {
      this.callback(this.props.onDrop, index);
      console.log("drop "+this.props.index+" to "+index);
    }
    this.setState({
      startX:0,
      startY:0,
      dragging:false,
      x:0,
      y:0,
    });
  }
 
  render() {
    return (<View
      style={[styles.itemContainer,
      {
        zIndex : this.state.dragging ? 1000: -1000,
        elevation: this.state.dragging ? 1000: -1000,
        /*position:  this.state.dragging ? 'absolute' : "relative",*/
        left:      this.state.dragging ? this.state.x : 0,
        top:       this.state.dragging ? this.state.y : 0,
        transform: this.state.dragging ? [{ scale: 1.1 }] : []
      }
      ]
      }
      onResponderStart={this.dragStart}
      onResponderMove={this.dragMove}
      onResponderRelease={this.dragEnd}
      onStartShouldSetResponderCapture={
        (evt) => true
      }
      onStartShouldSetResponder={() => true}
    >
      <Image source={this.props.image} style={styles.image}></Image>
      <Text
        style={styles.text}
      >{this.props.name}</Text>
    </View>);
  }
}


const ItemGrid = (props) => {
  const renderItem = ({ item: { name, image, index } }) => 
                      <Item name={name} image={image} index={index} 
                      onClick={props.onClick && (()=>props.onClick(index))}
                      onHold={props.onHold && (()=>props.onHold(index))}
                      onDrop={props.onDrop && ((target)=>props.onDrop(index, target))}
                      />;
  
  return (
    <FlatGrid
      style={styles.gridView}
      data={props.items}
      renderItem={renderItem}
    />
  );
};

function number(arr){
  return arr.map((item, index)=>({...item, index:index}));
}

const Items = () => {
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

  function itemDrop(from, to) {
    const newItems=[...state.items];
    newItems[to]=newItems[from];

    var pointer=0;
    for(var i=0; i<state.items.length; i++){
      if(pointer==from) pointer++;
      if(i==to) continue;
      newItems[i]=state.items[pointer++];
    }
    setState({...state, items:number(newItems) });
  }

  function selectedItem(){
    return state.items[state.selectedItem];
  }
  
  return (
    <View style={styles.body}>
    {state.itemView && <ItemView onPress={closeItemView} name={selectedItem().name} image={selectedItem().image} description={selectedItem().description}/>}
    <Text style={[styles.text, { fontSize: 30, marginTop: 10 }]}>Healing</Text>
    <ItemGrid items={state.items} onClick={itemClick} onDrop={itemDrop} ></ItemGrid>
  </View>);
}
const Characters = () => {
  const initalItems = number(new Array(9).fill(new ItemData("John"))
  .map((value, index)=>({...value, name:value.name+` ${index}`})
  ));

  const [state, setState] = useState({
    items:initalItems,
    inventory:false,
    characterEditor:false,
    selectedCharacter:0
  });

  function itemDrop(from, to) {
    const newItems=[...state.items];
    newItems[to]=newItems[from];

    var pointer=0;
    for(var i=0; i<state.items.length; i++){
      if(pointer==from) pointer++;
      if(i==to) continue;
      newItems[i]=state.items[pointer++];
    }
    setState({...state, items:number(newItems) });
  }

  function itemHold(index){
    setState({...state, selectedCharacter:index, characterEditor:true});
  }

  function itemClick(index){
    setState({...state, selectedCharacter:index, inventory:true});
  }

  return (<View>
    {state.characterEditor && <CreateCharacter/>}
    {state.inventory && <Items/>}
    {(!state.characterEditor && !state.inventory)
    && <View style={styles.body}>
      <Text style={[styles.text, { fontSize: 30, marginTop: 10 }]}>Characters</Text>
      <ItemGrid items={state.items} onDrop={itemDrop} onHold={itemHold} onClick={itemClick}></ItemGrid>
      <Text style={[styles.text, { fontSize: 17, marginBottom: 10 }]}>( Hold to edit )</Text>
      </View>
    }
    
  </View>);
}

export default Characters;