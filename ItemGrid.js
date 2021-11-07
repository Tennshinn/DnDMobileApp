import React from 'react';
import { View, Image, Text } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import styles from "./styles";

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