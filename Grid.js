import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

const PRIMARY="#efd3ad";
const BACKGROUND="#010101";
const PANEL="#121212";

const Item= () => {
    return (<View
        style={{
            backgroundColor:PANEL,
            padding:7
        }}
    >
        <Image source={require('./img/HomeScreen.jpg')} style={
            {
    width: '100%',
    height: 100,
    resizeMode: 'cover'
            }
        }></Image>
        <Text
            style={{
                color:PRIMARY,
                textAlign:"center"
            }}
        >Magic Potion of Healing</Text>
    </View>);
}

const DnDApp= () => {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowText((showText) => !showText);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <FlatGrid
    style={styles.gridView}
  data= {['A', 'B', 'C', 'D', 'E']}
  renderItem={({ item }) => Item()}

/>
  );
};

const styles = StyleSheet.create({
    gridView: {
        backgroundColor:BACKGROUND,
        marginTop: 10,
        flex: 1,
        height:100,
      },
      itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
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
});

export default DnDApp;