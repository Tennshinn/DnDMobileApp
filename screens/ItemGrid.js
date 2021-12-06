import { View, Image, Text } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import styles from "../styles";
import React, { Component } from 'react';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
 
class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startX:0,
      startY:0,
      x:0,
      y:0,
      dragging:false,
      message:""
    }
  }

  dragStart  = (event) => {
    if(!this.state.dragging)
      this.setState({
        startX:event.nativeEvent.pageX,
        startY:event.nativeEvent.pageY,
        dragging:true,
        x:0,
        y:0,
      });
  }

  dragMove  = (event) => {
    this.setState({
      startX:this.state.startX,
      startY:this.state.startY,
      x:event.nativeEvent.pageX-this.state.startX,
      y:event.nativeEvent.pageY-this.state.startY,
      dragging:true,
     });
  }

  dragEnd  = (event) => {
    this.setState({
      startX:0,
      startY:0,
      dragging:false,
      x:0,
      y:0,
    });
    const header_size=40;
    const row_length=3;
    const y=Math.floor((event.nativeEvent.pageY-header_size)/styles.itemContainer.height);
    const x=Math.floor(event.nativeEvent.pageX/styles.itemContainer.height);
    const index=y*row_length+x;
    console.log("x="+x, "y="+y, "index="+index);
  }
 
  render() {
    return (<View
      style={[styles.itemContainer,
      {
        elevation:this.state.dragging ? 1000: -1000,
        position: this.state.dragging ? 'absolute' : "relative",
        left:     this.state.x,
        top:      this.state.y,
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
      >{this.props.text}</Text>
    </View>);
  }
}

const ItemGrid = () => {
  return (
    <FlatGrid 
      style={styles.gridView}
      data={new Array(8).fill({ text: "Character name", image: require('../img/warrior.png') }).map((value, index)=>({...value, text:value.text+` ${index}`}) ) }
      renderItem={({ item: { text, image } }) => <Item text={text} image={image} />}
    />
    
  );
};

const Items = () => {
  return (<View style={styles.body}>
    <Text style={[styles.text, { fontSize: 30, marginTop: 10 }]}>Healing</Text>
    <ItemGrid></ItemGrid>
  </View>);
}

const Characters = ({navigation}) => {
  return (<View style={styles.body}>
    <Text style={[styles.text, { fontSize: 30, marginTop: 10 }]}>Characters</Text>
    <ItemGrid></ItemGrid>
    <Text onPress={()=>navigation.navigate('CreateCharacter')} style={[styles.text, { fontSize: 17, marginBottom: 10, marginTop:10}]}>( Click to add new )</Text>
    <Text style={[styles.text, { fontSize: 17, marginBottom: 10}]}>( Hold to edit )</Text>
  </View>);
}

export default Characters;