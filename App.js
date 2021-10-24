import React, { useState, useEffect } from 'react';
import { SafeAreaView, ImageBackground, StyleSheet, Text, View } from 'react-native';

const DnDApp= () => {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowText((showText) => !showText);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
    <ImageBackground source={require('./img/HomeScreen.jpg')} resizeMode="cover" style={styles.image}>
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container2}>
        <Text
          style={[styles.textStyle, { display: showText ? 'none' : 'flex' }]}>
          TAP SCREEN TO START
        </Text>
      </View>
    </SafeAreaView>
    </ImageBackground>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems:"center",
  },
  text: {
    color: "white",
    fontSize: 24,
    lineHeight: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  container2: {
    justifyContent:"center",
    alignItems:"center",
    transform: [{ translateY: 300 }],
    padding: 20,
    height:80,
    width:300,
    backgroundColor: "#000000CC",
    borderRadius:25,
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  textStyle: {
    color: "white",
    fontSize: 24,
    lineHeight: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DnDApp;