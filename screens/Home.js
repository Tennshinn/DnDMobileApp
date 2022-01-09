import React, { useRef, useEffect } from 'react';
import { SafeAreaView, Animated, ImageBackground, Text, View, TouchableOpacity } from 'react-native';
import style from "../styles/style";

const Home= ({navigation}) => {
  return (
    <View style={style.homeScreenWrapper}>
    <ImageBackground source={require('../img/HomeScreen.jpg')} resizeMode="cover" style={style.homeScreenImage}>
    <SafeAreaView style={{ flex: 1 }}>
      <View style={style.homeScreenTextContainerOpenApp}>
        <TouchableOpacity onPress={()=>navigation.navigate('CharactersList')} style={[style.homeScreenTitle]}>
          <Text style={[style.homeScreenTitle]}>SELECT CHARACTER</Text>
        </TouchableOpacity>
      </View>

      <View style={style.homeScreenTextContainerUploadPackage}>
        <TouchableOpacity onPress={()=>navigation.navigate('PackagesList')} style={[style.homeScreenTitle]}>
          <Text style={[style.homeScreenTitle]}>UPLOAD PACKAGE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </ImageBackground>
  </View>
  );
};

export default Home;