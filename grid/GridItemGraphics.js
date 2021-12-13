import { View, Image, Text } from 'react-native';
import styles from "../styles";
import React, { Component } from 'react';

const HOLD_TIME = 800;
const DRAG_DELTA = 10;

export default function GridItemGraphics(props) {
  return (<View
      style={styles.itemContainer}
    >
      <Image source={props.image} style={styles.image}></Image>
      <Text
        style={styles.text}
      >{props.name}</Text>
    </View>);
}