import { View, Image, Text } from 'react-native';
import styles from "../styles";
import React, { Component } from 'react';

const HOLD_TIME = 800;
const DRAG_DELTA = 10;

export default function GridItemGraphics(props) {
  return (<View
      style={styles.itemContainer}
    >
      <Image source={props.image} style={[styles.image, {tintColor : props.color}]}></Image>
      <Text
        style={[styles.text, {color:props.color}]}
      >{props.name}</Text>
    </View>);
}