import { View } from 'react-native';
import styles from "../styles";
import React, { Component } from 'react';
import GridItemGraphics from './GridItemGraphics'; 

const HOLD_TIME = 800;
const DRAG_DELTA = 10;

export default class GridItem extends Component {
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

  updateDragged(state) {
    this.callback(this.props.updateDragged, {
      x:this.state.elementX+this.state.x || 0,
      y:this.state.elementY+this.state.y || 0,
      width:this.state.width,
      height:this.state.height,
      visible:this.state.dragging,
      name:this.props.name,
      image:this.props.image,
    });
  }

  setStateWithDragged(state){
    this.updateDragged(state);
    this.setState(state);
  }

  dragStart  = (event) => {
    if(!this.state.dragging)
      this.setStateWithDragged({
        startXOffset:event.nativeEvent.pageX,
        startYOffset:event.nativeEvent.pageY,
        dragging:false,
        x:0,
        y:0,
        holdingStartTime: Date.now()
      });
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
    this.setStateWithDragged({
      ...this.state,
      x:x,
      y:y,
      dragging:this.state.dragging || new_dragging
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
    this.setStateWithDragged({
      startXOffset:0,
      startYOffset:0,
      dragging:false,
      x:0,
      y:0,
    });
  }

  onLayout = (event) =>  {
    if(!this.state.dragging){
      // save size and position relative to the page
      this.view.measure( (fx, fy, width, height, pageX, pageY) => {
        this.setStateWithDragged({
          ...this.state,
          width:width,
          height:height,
          elementX:pageX,
          elementY:pageY,
        });
        });
      }
  }
 
  render() {
    return (<View
      style={{
        // hide this element and display ElevatedGridItem isntead
        display:this.state.dragging ? "none" : "flex",
      }}
      ref={view => { this.view = view; }}
      
      onResponderStart={this.dragStart}
      onResponderMove={this.dragMove}
      onResponderRelease={this.dragEnd}
      onStartShouldSetResponderCapture={
        (evt) => true
      }
      onStartShouldSetResponder={() => true}
      onResponderTerminationRequest={() => true}
      onResponderTerminate={() => (this.setStateWithDragged({...this.state, dragging:false}))}
      onLayout={this.onLayout}
    >
      <GridItemGraphics image={this.props.image} name={this.props.name}
      ></GridItemGraphics>
    </View>);
  }
}