import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import styles from "./styles";

const ItemView = (props) => {

  const name = props.name ?? "Magic Health Potion";
  const image = props.image ?? require('./img/fire-bowl.png');
  const description = props.description ?? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates dolorem molestiae necessitatibus quod. Veniam facere nobis recusandae repudiandae iste voluptas minima aut repellendus nihil quis exercitationem quas, inventore iusto. Minima?";
  const icons = props.icons ?? "4⚅     2⚂";

  return (
  <View style={styles.body}>
    <TouchableWithoutFeedback onPress={props.onPress}>
    <View
      style={[styles.itemContainer, styles.itemView]}
    >
      <View style={{flexDirection:"row"}}>
      <Image source={image} style={styles.itemViewImage}></Image>   
      <Text
        style={styles.itemTitle}
      >{name}</Text>
  </View>

      <Text
        style={styles.itemDescription}
      >{description}</Text>

  <Text
        style={styles.itemIcons}
      >{icons}</Text>
    </View>
    </TouchableWithoutFeedback>
  </View>);
}

export default ItemView;