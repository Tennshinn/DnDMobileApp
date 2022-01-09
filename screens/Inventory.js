import { View, FlatList, Text, Dimensions, Modal, Pressable, TextInput } from 'react-native';
import ItemDetails from './ItemDetails';
import styles from "../styles";
import React, { useState, Component, Dime } from 'react';
import Grid from '../grid/Grid';
import ItemData from '../data/ItemData';
import { Panel } from '../data/datatypes';
import { number, moveArrayItem } from '../grid/helpers';

import LinearGradient from 'react-native-linear-gradient';

const PanelItem = ({ item, viewRef }) => {
  return (<View
    style={[styles.itemContainer, { marginHorizontal: 8, width: 70, height: 132 }]}
    ref={viewRef}
  >
    <Text style={[styles.text, { fontSize: 14 }]} >{item.title}</Text></View>
  );
}

class PanelNameEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      text: ""
    };
  }
  open(text) {
    this.setState({ open: true, text: text });

  }
  close() {
    this.props.onAccept(this.state.text);
    this.setState({ open: false });
  }
  render() {
    return <Modal
      animationType="slide"
      transparent={true}
      visible={this.state.open}
      onRequestClose={() => this.close()}>
      <View style={[styles.body, {
        margin: 45, top: 140,
        padding: 35, height: 200
      }]}>
        <View >
          <Text style={[styles.text, { textAlign: "left", fontSize: 25, marginBottom: 15, marginLeft: 2, opacity: 0.8 }]}>Set panel name</Text>
          <TextInput
            style={[styles.text, { textAlign: "left", fontSize: 30, marginBottom: 10 }]}
            placeholder="Panel Name"
            placeholderTextColor="#CCC"
            value={this.state.text}
            onChangeText={text => this.setState({ ...this.state, text: text })}
          />
          <Pressable onPress={() => this.close()}>
            <Text style={[styles.text, { textAlign: "right" }]}>OK</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  }
}

function HorizontalDraggingWrapper({ children, dragBorder, onMoved, draggable, dragAllowed }) {

  const [offsetX, setOffsetX] = useState(0);
  const [startX, setStartX] = useState(0);
  const [x, setX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const view = React.createRef();

  const dragAmount = () => x - startX;

  function dragStart(event) {
    setDragging(true);
    setStartX(event.nativeEvent.pageX);
    setX(event.nativeEvent.pageX);
  }
  function dragMove(event) {
    if (!dragAllowed || dragAllowed(-Math.sign(event.nativeEvent.pageX - startX))) {
      setX(event.nativeEvent.pageX);
    }
  }
  function dragEnd() {
    if (Math.abs(dragAmount()) >= dragBorder && onMoved) {
      onMoved(-Math.sign(dragAmount()));
    }
    setDragging(false);
    setStartX(0);
    setX(0);
  }
  function onLayout() {
    if (!dragging)
      view.current.measure((fx, fy, width, height, pageX, pageY) => {
        if (!dragging)
          setOffsetX(pageX);
      });
  }

  return <View
    ref={view}
    style={{
      position: 'absolute',
      opacity: 1 - Math.abs(dragAmount()) / dragBorder,
      height: "100%",
      transform: [
        { translateX: dragAmount() },
        { scale: 1 - Math.abs(dragAmount()) / dragBorder / 20 }
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

export default class Inventory extends Component {
  constructor(props) {
    super(props);

    const initalItems = number(Array.from(
      { length: 9 },
      () => new ItemData("Healing Potion " + (Math.random().toString()).substring(0, 5))));

    const initialPanels = number(Array.from(
      { length: 5 },
      () => new Panel("Healing " + (Math.random().toString()).substring(2, 4), initalItems)));

    this.state = {
      panels: initialPanels,
      selectedPanel: 0,
      editing: true,
      dragging: false
    };

    this.panelRefs = this.state.panels.map(p => React.createRef());
    this.updateItemsRefs(this.getSelectedPanel().itemIds.length);
    this.panelNameEdit = React.createRef();
  }

  updateItemsRefs(count) {
    this.itemRefs = Array.from(
      { length: count },
      () => React.createRef());
  }

  getSelectedPanel() {
    return this.state.panels[this.state.selectedPanel];
  }

  onDragEnd(index, x, y) {
    this.setDragging(false);

    let count = 0;
    let panel = null;
    let item = null;
    const finish = () => {
      count++;
      console.log(count, this.panelRefs.length, this.itemRefs.length)
      if (count == this.panelRefs.length + this.itemRefs.length) {
        if (panel != null && panel!=this.state.selectedPanel) {
          if (this.state.selectedPanel != 0) {
            // update refs before removing item from the panel
            this.updateItemsRefs(this.getSelectedPanel().itemIds.length-1);
          }
          this.setState(state => ({
            ...state,
            panels: state.panels.map((panelObject, panelIndex) =>
              // remove item from the current panel
              (panelIndex == state.selectedPanel && state.selectedPanel != 0)
                ? new Panel(panelObject.name, panelObject.itemIds.filter(e => !e || e.index != index))
                // add item to the panel that is the target of the drop 
                : (panelIndex == panel
                  ? new Panel(panelObject.name, [...panelObject.itemIds, this.getSelectedPanel().itemIds[index]])
                  : panelObject)
            )
          }));
          console.log("move to panel", index, panel);
        } else if (item != null) {
          this.setState(state => ({
            ...state,
            panels: state.panels.map((panelObject, panelIndex) =>
              panelIndex == state.selectedPanel
                ? new Panel(panelObject.name, number(moveArrayItem(panelObject.itemIds, index, item)))
                : panelObject
            )
          }));
          console.log("move to item position", index, item);
        }
      }
    }
    const inBounds = (refList, callback) => {
      refList.map((p, i) => p.current?.measure((fx, fy, width, height, pageX, pageY) => {
        if (
          x >= pageX && x <= pageX + width
          &&
          y >= pageY && y <= pageY + height
        ) {
          callback(i);
        }
        finish();
      }));
    }
    console.log("this.panelRefs", this.panelRefs);
    console.log("this.itemRefs", this.itemRefs);
    inBounds(this.panelRefs, index=>panel=index);
    inBounds(this.itemRefs, index=>item=index);
  }

  setDragging(dragging) {
    this.setState({ ...this.state, dragging: dragging });
  }

  itemClick(index) {
    const item = this.getSelectedPanel().itemIds[index];
    this.props.navigation.navigate("ItemDetails", {
      name: item.name,
      image: item.getImage(),
      description: item.description,
      icons: item.icons,
      color: item.getColor()
    });
  }

  switchEditing() {
    this.setState({ ...this.state, editing: !this.state.editing });
  }

  setTitle(title) {
    this.setState(state => ({
      ...state,
      panels: state.panels.map((panel, index) =>
        index == state.selectedPanel
          ? new Panel(title, panel.itemIds)
          : panel
      )
    }));
  }

  panelExists(panel) {
    return panel >= 0 && panel < this.state.panels.length;
  }

  render() {

    return (
      <View style={styles.body}>
        <View style={{ elevation: 100, zIndex: 100, }}>
          <Pressable onPress={this.switchEditing.bind(this)} >
            <Text style={[styles.text, {
              fontSize: 25, elevation: 100, zIndex: 100,
              position: "absolute", right: 15, top: 15, opacity: (this.state.editing ? 0.5 : 1), transform: [{ rotateZ: "7deg" }]
            }]}>
              {this.state.editing ? "<View" : ">Edit"}
            </Text>
          </Pressable>
        </View>
        <HorizontalDraggingWrapper
          draggable={!this.state.editing}
          dragBorder={120}
          onMoved={(direction) => {
            const newPanel = this.state.selectedPanel + direction;
            if (this.panelExists(newPanel)) {
              this.updateItemsRefs(this.state.panels[newPanel].itemIds.length);
              this.setState({ ...this.state, selectedPanel: newPanel });
            }
          }}
          dragAllowed={direction => this.panelExists(this.state.selectedPanel + direction)}
        >
          <Pressable onPress={() => this.panelNameEdit.current?.open(this.getSelectedPanel().name)}>
            <Text style={[styles.text, { fontSize: 30, marginTop: 10 }]}>{this.getSelectedPanel().name || "---"}</Text>
          </Pressable>
          <Grid items={number(this.state.panels[this.state.selectedPanel].itemIds)}
            onClick={this.itemClick.bind(this)}
            viewRef={index => this.itemRefs[index]}
            draggable={this.state.editing} onDragStart={_ => this.setDragging(true)}
            onDragEnd={this.onDragEnd.bind(this)} >
            <PanelNameEdit ref={this.panelNameEdit} onAccept={this.setTitle.bind(this)} />

            {this.state.dragging &&
              <LinearGradient colors={['#00000000', '#000000', '#000000ff']}
                style={{ position: "absolute", bottom: 28, width: "100%", height: 250 }}>
                <FlatList
                  style={{ position: "absolute", bottom: 30 }}
                  contentContainerStyle={{ alignItems: 'center', width: "100%", justifyContent: "center", display: "flex" }}
                  data={number(this.state.panels.map(p => ({ title: p.name })))}
                  renderItem={({ item }) => (<PanelItem item={item} viewRef={this.panelRefs[item.index]} key={item.index} />)}
                  horizontal={true}
                  keyExtractor={(item) => item.id}
                />
              </LinearGradient>}
          </Grid>
        </HorizontalDraggingWrapper>

      </View>);
  }
}