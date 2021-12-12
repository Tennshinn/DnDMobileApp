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

function ItemCard(props) {
  return (<View
      style={styles.itemContainer}
    >
      <Image source={props.image} style={styles.image}></Image>
      <Text
        style={styles.text}
      >{props.name}</Text>
    </View>);
}

class DraggedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x:0,
      y:0,
      width:100,
      height:100,
      visible:false
    }
  }

  update(state) {
    this.setState({
      ...this.state,
      ...state
    })
  }

  render() {
    return (<View
      style={{
        zIndex : 1000,
        elevation: 1000,
        position:  'absolute',
        left:      this.state.x-this.state.width/2*0.1,// correct for upscale
        top:       this.state.y-this.state.height/2*0.1-45,// constant is set through try and error 
        width:this.state.width,
        height:this.state.height,
        display:this.state.visible ? "flex" : "none",
        transform: [{ scale: 1.1 }] 
      }}
      
    >
      <ItemCard image={this.props.image} name={this.props.name}></ItemCard>
    </View>);
  }
}

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startXOffset:0,
      startYOffset:0,
      elementX:0,
      elementY:0,
      x:0,
      y:0,
      width:100,
      height:100,
      dragging:false,
      holdingStartTime:0
    }
  }

  updateDragged() {
    this.callback(this.props.updateDragged, {
      x:this.state.elementX+this.state.x,
      y:this.state.elementY+this.state.y,
      width:this.state.width,
      height:this.state.height,
      visible:this.state.dragging,
    });
  }

  dragStart  = (event) => {
    if(!this.state.dragging)
      this.setState({
        startXOffset:event.nativeEvent.pageX,
        startYOffset:event.nativeEvent.pageY,
        dragging:false,
        x:0,
        y:0,
        holdingStartTime: Date.now()
      }, this.updateDragged);
  }

  distance(ax, ay, bx, by){
    const dx=bx-ax;
    const dy=by-ay;
    return Math.sqrt(dx*dx+dy*dy);
  }

  dragMove  = (event) => {
    const x=event.nativeEvent.pageX-this.state.startXOffset;
    const y=event.nativeEvent.pageY-this.state.startYOffset;
    const new_dragging= Math.sqrt(x*x+y*y)>DRAG_DELTA;
    this.setState({
      ...this.state,
      x:x,
      y:y,
      dragging:this.state.dragging || new_dragging
     }, this.updateDragged);
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
      if (Date.now()-this.state.holdingStartTime>=HOLD_TIME){
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
      startXOffset:0,
      startYOffset:0,
      dragging:false,
      x:0,
      y:0,
    }, this.updateDragged);
  }

  onLayout = (event) =>  {
    if(!this.state.dragging){
      // save size and position relative to the page
      this.view.measure( (fx, fy, width, height, pageX, pageY) => {
        this.setState({
          ...this.state,
          width:width,
          height:height,
          elementX:pageX,
          elementY:pageY,
        }, this.updateDragged);
        });
      }
  }
 
  render() {
    return (<View
      style={{
        zIndex : this.state.dragging ? 1000: -1000,
        elevation: this.state.dragging ? 1000: -1000,
        position:  this.state.dragging ? 'absolute' : "relative",
        left:      this.state.dragging ? this.state.x : 0,
        top:       this.state.dragging ? this.state.y : 0,
        transform: this.state.dragging ? [{ scale: 0.1 }] : []
      }}
      ref={view => { this.view = view; }}
      onResponderStart={this.dragStart}
      onResponderMove={this.dragMove}
      onResponderRelease={this.dragEnd}
      onStartShouldSetResponderCapture={
        (evt) => true
      }
      onStartShouldSetResponder={() => true}
      onLayout={this.onLayout}
    >
      <ItemCard image={this.props.image} name={this.props.name}
      ></ItemCard>
    </View>);
  }
}

const ItemGrid = (props) => {
  const dragged = React.createRef();
  const renderItem = ({ item: { name, image, index } }) => 
                      <Item name={name} image={image} index={index} 
                      onClick={props.onClick && (()=>props.onClick(index))}
                      onHold={props.onHold && (()=>props.onHold(index))}
                      onDrop={props.onDrop && ((target)=>props.onDrop(index, target))}
                      updateDragged={(state)=>dragged.current && dragged.current.update(state)}
                      />;
  
  return (
    <View style={styles.body}>
      <FlatGrid
        style={styles.gridView}
        data={props.items}
        renderItem={renderItem}
      />
      <DraggedItem ref={dragged}
        name={props.items[0].name} image={props.items[0].image} index={props.items[0].index} 
      ></DraggedItem>
    </View>
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