import { View, Image, Text } from 'react-native';
import React, { Component } from 'react';
import GridItemGraphics from './GridItemGraphics'; 

// This component was introduced because elevation doesn't work with grid rows 
// and dragged items were staying behind the ones in further rows
// it should be placed after the grid
export default class ElevatedGridItem extends Component {
    constructor(props) {
      super(props);
      this.state = {
        x:0,
        y:0,
        width:100,
        height:100,
        visible:false,
        name:"",
        image:require('../img/fire-bowl.png'),
        color:""
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
          width:this.state.width,
          height:this.state.height,
          display:this.state.visible ? "flex" : "none",
          transform: [
            { scale: 1.1}, // enlarge for visual feedback
            // using translate instead of left and top increases performance
            {translateX:this.state.x-this.state.width/2*0.1}, // correct for upscale
            {translateY:this.state.y-this.state.height/2*0.1-45 } // constant is set through try and error 
          ] 
        }}
        
      >
        <GridItemGraphics image={this.state.image} name={this.state.name} color={this.state.color}></GridItemGraphics>
      </View>);
    }
  }