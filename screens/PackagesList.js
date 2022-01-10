import React, { useState } from "react";
import { Text, View, Button, Alert, TouchableOpacity, FlatList } from "react-native";
import style from "../styles/style";
import {REPOSITORY, Package} from '../data/Repository';
import {number} from '../grid/helpers'; 
import RectangularButton from "../shared/RectangularButton";
import CircleButton from "../shared/CircleButton";
import LinearGradient from 'react-native-linear-gradient';

const PackagesList= ({navigation, route}) => {
  const [packages, setPackages] = useState(REPOSITORY.packages);
  const [index, setIndex] = useState(0);
  const [packageName, setPackageName] = useState(null);

  React.useEffect(() => {
    const data = route.params?.package;
    if(data) {
      if (packageName)
        REPOSITORY.removePackage(packageName);
      
      const $package = new Package();

      for (const key of Object.keys(data)) {
        $package[key] = data[key];
      }

      REPOSITORY.addPackage($package);

      setPackages([...REPOSITORY.packages]);
    }
  }, [route.params?.package]);

  const editPackage = (packageName=null) => {
    setPackageName(index);
    navigation.navigate('PackageEditor', {package:{...packages[index]}});
  }

  const packageRow = (index, name, link)=>
    <View style={style.packagesRow}>
    <Text style={style.packagesRowHeader}>{name}</Text>
    <Text style={style.packagesRowLink}>{link}</Text>
    <View style={style.packagesButtonsRow}>
      <RectangularButton title="EDIT" onPress={()=>editPackage(packages[index].name)} />
      <RectangularButton title="REMOVE" onPress={()=>{
        REPOSITORY.removePackage(packages[index].name);
        setPackages(REPOSITORY.packages);
      }} />
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
        style={{position:"absolute", bottom:24, width:"100%", height:140}}
        >
        <CircleButton visible={true} title="NEW" onPress={() => editPackage(packages.length)}></CircleButton>
        </LinearGradient>
    </View>
  );
};

export default PackagesList;

