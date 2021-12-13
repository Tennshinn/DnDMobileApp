import React, { useState, useEffect } from 'react';
import { SafeAreaView, ImageBackground, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Home= ({navigation}) => {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowText((showText) => !showText);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.homeScreenWrapper}>
    <ImageBackground source={require('../img/HomeScreen.jpg')} resizeMode="cover" style={styles.homeImage}>
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.textContainer}>
        <TouchableOpacity onPress={()=>navigation.navigate('CharactersList')} style={[styles.titleText, { display: showText ? 'none' : 'flex' }]}>
          <Text style={[styles.titleText]}>TAP TO OPEN</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.textContainer2}>
        <TouchableOpacity onPress={()=>navigation.navigate('Packages')} style={[styles.titleText]}>
          <Text style={[styles.titleText]}>UPLOAD PACKAGE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </ImageBackground>
  </View>
  );
};

const styles = StyleSheet.create({
  homeScreenWrapper: {
    flex: 1,
  },
  homeImage: {
    flex: 1,
    justifyContent: "center",
    alignItems:"center",
  },
  textContainer: {
    justifyContent:"center",
    alignItems:"center",
    transform: [{ translateY: 300 }],
    padding: 20,
    height:80,
    width:300,
    backgroundColor: "#000000CC",
    borderRadius:25,
  },
  textContainer2: {
    justifyContent:"center",
    alignItems:"center",
    transform: [{ translateY: 300 }],
    padding: 20,
    marginTop:15,
    height:80,
    width:300,
    backgroundColor: "#000000CC",
    borderRadius:25,
  },
  titleText: {
    color: "#FBC403",
    fontSize: 24,
    lineHeight: 40,
    fontWeight: "bold",
    textAlign: "center",
    width:300,
    height:80,
    borderRadius:25,
    paddingTop:10,
  },
});

export default Home;