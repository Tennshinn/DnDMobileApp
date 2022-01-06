import GridItem from './GridItem'; 
import ElevatedGridItem from './ElevatedGridItem'; 
import React  from 'react';
import { View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import styles from "../styles";

export default function Grid(props) {
  const dragged = React.createRef();
  const renderItem = ({ item }) => 
                      <GridItem name={item.name} image={item.getImage()} index={item.index} color={item.getColor()}
                      draggable={props.draggable}
                      onClick={props.onClick && (()=>props.onClick(item.index))}
                      onHold={props.onHold && (()=>props.onHold(item.index))}
                      onDrop={props.onDrop && ((target)=>props.onDrop(item.index, target))}
                      onDragStart={props.onDragStart && (()=>props.onDragStart(item.index))}
                      onDragEnd={props.onDragEnd && ((x, y)=>props.onDragEnd(item.index, x, y))}
                      updateDragged={(state)=>props.draggable && dragged.current && dragged.current.update(state)}
                      />;
  
  return (
    <View style={styles.body}>
      <FlatGrid scrollEnabled={!props.draggable}
        style={styles.gridView}
        data={props.items}
        renderItem={renderItem}
      />
      {props.children}
      <ElevatedGridItem ref={dragged}
        name={props.items[0].name}
      ></ElevatedGridItem>
    </View>
  );
};
