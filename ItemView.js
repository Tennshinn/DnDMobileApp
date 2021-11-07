import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import styles from "./styles";

const ItemView = () => {

  const [state, setState] = useState({
    title:"Magic Health Potion", image:require('./img/HomeScreen.jpg') ,
    description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates dolorem molestiae necessitatibus quod. Veniam facere nobis recusandae repudiandae iste voluptas minima aut repellendus nihil quis exercitationem quas, inventore iusto. Minima?", 
    icons:"4⚅     2⚂"
  });

  return (
  <View style={styles.body}>
  <View
    style={[styles.itemContainer, styles.itemView]}
  >
    <View style={{flexDirection:"row"}}>
    <Image source={state.image} style={styles.itemViewImage}></Image>   
    <Text
      style={styles.itemTitle}
    >{state.title}</Text>
</View>

    <Text
      style={styles.itemDescription}
    >{state.description}</Text>

<Text
      style={styles.itemIcons}
    >{state.icons}</Text>
  </View>
  </View>);
}

export default ItemView;