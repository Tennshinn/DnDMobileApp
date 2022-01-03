import React, { useState, useEffect } from 'react';
import { SafeAreaView, ImageBackground, Text, View, TouchableOpacity } from 'react-native';
import style from "../styles/style";

const Home= ({navigation}) => {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowText((showText) => !showText);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={style.homeScreenWrapper}>
    <ImageBackground source={require('../img/HomeScreen.jpg')} resizeMode="cover" style={style.homeScreenImage}>
    <SafeAreaView style={{ flex: 1 }}>
      <View style={style.homeScreenTextContainerOpenApp}>
        <TouchableOpacity onPress={()=>navigation.navigate('CharactersList')} style={[style.homeScreenTitle, { display: showText ? 'none' : 'flex' }]}>
          <Text style={[style.homeScreenTitle]}>TAP TO OPEN</Text>
        </TouchableOpacity>
      </View>

      <View style={style.homeScreenTextContainerUploadPackage}>
        <TouchableOpacity onPress={()=>navigation.navigate('Packages')} style={[style.homeScreenTitle]}>
          <Text style={[style.homeScreenTitle]}>UPLOAD PACKAGE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </ImageBackground>
  </View>
  );
};

export default Home;