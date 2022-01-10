import { View, FlatList, Text, Dimensions, Modal, Pressable, TextInput } from 'react-native';
import styles from "../styles";
import React, { Component } from 'react';
import Grid from '../grid/Grid';
import ItemData from '../data/ItemData';
import { REPOSITORY } from '../data/Repository';
import Panel from '../data/Panel';
import { number, moveArrayItem } from '../grid/helpers';
import PanelNameEdit from './inventory/PanelNameEdit';
import HorizontalDraggingWrapper from './inventory/HorizontalDraggingWrapper';
import CircleButton from "../shared/CircleButton";
import LinearGradient from 'react-native-linear-gradient';

const PanelItem = ({ item, viewRef }) => {
  return (<View
    style={[styles.itemContainer, { marginHorizontal: 8, width: 70, height: 132 }]}
    ref={viewRef}
  >
    <Text style={[styles.text, { fontSize: 14 }]} >{item.title}</Text></View>
  );
}

export default class Inventory extends Component {
  constructor(props) {
    super(props);

    const initalItems = number(Array.from(
      { length: 15 },
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
    this.itemRefs = [];
    this.updateItemsRefs(this.getSelectedPanel().itemIds.length);
    this.panelNameEdit = React.createRef();

    this._unsubscribe = props.navigation.addListener('focus', () => {
      const characterIndex = this.props.route?.params?.characterIndex;
      if (!characterIndex) {
        return;
      }
      const character = REPOSITORY.characters[characterIndex];
      if (!character) {
        return;
      }
      console.log("fetching character panels")
      const panels=[
        new Panel("All", REPOSITORY.itemsAvailable(character)),
        ...character.inventory
      ];
      this.character = character;

      this.setState(state=>({
        ...state,
        panels:panels
      }));
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  updateItemsRefs(count) {
    const newItemRefs = Array.from(
      { length: count },
      (v, k) => k < this.itemRefs.length ? this.itemRefs[k] : React.createRef());

    this.itemRefs = newItemRefs;
  }

  getSelectedPanel() {
    return this.state.panels[this.state.selectedPanel];
  }

  onDragEnd(index, x, y) {
    this.setDragging(false);

    let count = 0;
    let panel = null;
    let item = null;
    const updateCharacterPanels = (panels) => {
      if (this.character) {
        // skip the first "All" panel
        console.log("updating character panels");
        this.character.inventory = panels.filter((p, i) => i>0);
      }
      return panels;
    }
    const finish = () => {
      count++;
      if (count == this.panelRefs.length + this.itemRefs.length) {
        if (panel != null && panel != this.state.selectedPanel) {
          if (this.state.selectedPanel != 0) {
            // update refs before removing item from the panel
            this.updateItemsRefs(this.getSelectedPanel().itemIds.length - 1);
          }
          this.setState(state => ({
            ...state,
            panels: updateCharacterPanels(state.panels.map((panelObject, panelIndex) =>
              // remove item from the current panel
              (panelIndex == state.selectedPanel && state.selectedPanel != 0)
                ? new Panel(panelObject.name, panelObject.itemIds.filter(e => !e || e.index != index))
                // add item to the panel that is the target of the drop 
                : (panelIndex == panel
                  ? new Panel(panelObject.name, [...panelObject.itemIds, this.getSelectedPanel().itemIds[index]])
                  : panelObject)
            ))
          }));
          console.log("move to panel", index, panel);
        } else if (item != null) {
          this.setState(state => ({
            ...state,
            panels: updateCharacterPanels(state.panels.map((panelObject, panelIndex) =>
              panelIndex == state.selectedPanel
                ? new Panel(panelObject.name, number(moveArrayItem(panelObject.itemIds, index, item)))
                : panelObject
            ))
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
    inBounds(this.panelRefs, index => panel = index);
    inBounds(this.itemRefs, index => item = index);
  }

  setDragging(dragging) {
    this.setState({ ...this.state, dragging: dragging });
  }

  itemClick(index) {
    const item = this.getSelectedPanel().itemIds[index];
    this.props.navigation.navigate("ItemDetails", {
      name: item.name,
      image: item.image,
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
        <HorizontalDraggingWrapper
          draggable={true}
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
          <Grid items={number(this.getSelectedPanel().itemIds.map(REPOSITORY.itemGridItem.bind(REPOSITORY)))}
            onClick={this.itemClick.bind(this)}
            viewRef={index => this.itemRefs[index]}
            draggable={this.state.editing} onDragStart={_ => this.setDragging(true)}
            onDragEnd={this.onDragEnd.bind(this)} >
            {this.state.dragging &&
              <LinearGradient colors={['#00000000', '#000000', '#000000ff']}
                style={{ position: "absolute", bottom: 30, width: "100%", height: 250 }}>
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
        <PanelNameEdit ref={this.panelNameEdit} onAccept={this.setTitle.bind(this)} />
        <CircleButton visible={!this.state.dragging} title={this.state.editing ? "View" : "Edit"} onPress={this.switchEditing.bind(this)}></CircleButton>
      </View>);
  }
}