import React, { useState } from "react";
import { Text, View, Button, Alert, TouchableOpacity, FlatList } from "react-native";
import style from "../styles/style";
import {REPOSITORY, Package} from '../data/datatypes';
import {number} from '../grid/helpers'; 
import RectangularButton from "../shared/RectangularButton";
import LinearGradient from 'react-native-linear-gradient';

const Packages= ({navigation, route}) => {
  const [packages, setPackages] = useState(REPOSITORY.packages);
  const [index, setIndex] = useState(0);

  React.useEffect(() => {
    const data = route.params?.package;
    if(data) {
      const $package = new Package();

      for (const key of Object.keys(data)) {
        $package[key] = data[key];
      }

      if(index<packages.length) {
        setPackages(packages.map((p, i)=>i==index ? $package : p ));
      } else {
        // append a new character
        setPackages([...packages, $package]);
      }
      REPOSITORY.packages = packages;
    }
  }, [route.params?.package]);

  const editPackage = (index=null) => {
    if(index){
      setIndex(index);
    }
    navigation.navigate('PackageEditor', {package:{...packages[index]}});
  }

  const packageRow = (index, name, link)=>
    <View style={style.packagesRow}>
    <Text style={style.packagesRowHeader}>{name}</Text>
    <Text style={style.packagesRowLink}>{link}</Text>
    <View style={style.packagesButtonsRow}>
      <RectangularButton title="EDIT" onPress={()=>editPackage(index)} />
      <RectangularButton title="REMOVE" onPress={()=>setPackages(packages.filter(p=>p.index!=index))} />
    </View>
  </View>;

  return (
    <View style={style.packagesWrapper}>
      <Text style={style.packagesTitle}>Packages</Text>
      <FlatList
          contentContainerStyle={{alignItems: 'center', width:"100%", justifyContent: "center", display:"flex",
          paddingBottom: 150,}}
          data={number(packages)}
          renderItem={({item})=>packageRow(item.index, item.name, item.link)}
          keyExtractor={p => p.index}
        />
        <LinearGradient colors={['#00000000', '#000000b0', '#000000bb']}
        style={{position:"absolute", bottom:28, width:"100%", height:140}}
        >
        <View style={[style.packagesAddNewContainer]}>
            <View style={[style.packagesAddButton, {backgroundColor:"black"}]}>
          <TouchableOpacity activeOpacity={0.8} onPress={()=>editPackage(packages.length)}>
            <View style={style.packagesAddButton}>
              <Text style={style.packagesAddButtonText}>
                NEW
              </Text>
            </View>
          </TouchableOpacity>
            </View>
        </View>
        </LinearGradient>
    </View>
  );
};

export default Packages;

