import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

const PRIMARY = "#efd3ad";
const BACKGROUND = "#010101";
const PANEL = "#121212";

const Item = ({ text, image }) => {
  return (<View
    style={styles.itemContainer}
  >
    <Image source={image} style={styles.image}></Image>
    <Text
      style={styles.text}
    >{text}</Text>
  </View>);
}

const ItemGrid = () => {
  return (
    <FlatGrid
      style={styles.gridView}
      data={new Array(9).fill({ text: "Magic Potion of Healing", image: require('./img/HomeScreen.jpg') })}
      renderItem={({ item: { text, image } }) => <Item text={text} image={image} />}
    />
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: BACKGROUND,
    height: "100%",
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    borderRadius: 5,
    height: 150,


    backgroundColor: PANEL,
    padding: 7
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
  text: {
    color: PRIMARY,
    textAlign: "center"
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderRadius: 5,
  },
});

const Items = () => {
  return (<View style={styles.body}>
    <Text style={[styles.text, { fontSize: 30, marginTop: 10 }]}>Support</Text>
    <ItemGrid></ItemGrid>
  </View>);
}

const Characters = () => {
  return (<View style={styles.body}>
    <Text style={[styles.text, { fontSize: 30, marginTop: 10 }]}>Characters</Text>
    <ItemGrid></ItemGrid>
    <Text style={[styles.text, { fontSize: 17, marginBottom: 10 }]}>( Hold to edit )</Text>
  </View>);
}

export default Items;