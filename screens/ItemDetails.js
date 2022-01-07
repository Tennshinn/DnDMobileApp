import { View, Image, Text, TouchableWithoutFeedback } from 'react-native';
import styles from "../styles";
import React from 'react';

export default function ItemDetails(props) {
  const params = props.route.params;
  const name = params.name ?? "Magic Health Potion";
  const image = params.image ?? require('../img/fire-bowl.png');
  const description = params.description ?? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates dolorem molestiae necessitatibus quod. Veniam facere nobis recusandae repudiandae iste voluptas minima aut repellendus nihil quis exercitationem quas, inventore iusto. Minima?";
  const icons = params.icons ?? "4⚅     2⚂";

  return (
  <View style={styles.body}>
    <TouchableWithoutFeedback onPress={props.navigation.goBack}>
    <View
      style={[styles.itemContainer, styles.itemView]}
    >
      <View style={{flexDirection:"row"}}>
      <Image source={image} style={[styles.itemViewImage, {tintColor : params.color}]}></Image>   
      <Text
        style={[styles.itemTitle, {color:params.color}]}
      >{name}</Text>
  </View>

      <Text
        style={[styles.itemDescription, {color:params.color}]}
      >{description}</Text>

  <Text
        style={[styles.itemIcons, {color:params.color}]}
      >{icons}</Text>
    </View>
    </TouchableWithoutFeedback>
  </View>);
}