import GridItem from './GridItem'; 
import ElevatedGridItem from './ElevatedGridItem'; 
import React  from 'react';
import { View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

export default function Grid(props) {
  const dragged = React.createRef();
  const renderItem = ({ item: { name, image, index } }) => 
                      <GridItem name={name} image={image} index={index} 
                      onClick={props.onClick && (()=>props.onClick(index))}
                      onHold={props.onHold && (()=>props.onHold(index))}
                      onDrop={props.onDrop && ((target)=>props.onDrop(index, target))}
                      updateDragged={(state)=>dragged.current && dragged.current.update(state)}
                      />;
  
  return (
    <View style={styles.body}>
      <FlatGrid scrollEnabled={false}
        style={styles.gridView}
        data={props.items}
        renderItem={renderItem}
      />
      {props.children}
      <ElevatedGridItem ref={dragged}
        name={props.items[0].name} image={props.items[0].image} index={props.items[0].index} 
      ></ElevatedGridItem>
    </View>
  );
};
