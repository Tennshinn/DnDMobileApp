import React from "react";
import { Text, View, Button, Alert, TouchableOpacity, FlatList } from "react-native";
import _style from "../styles/style";

const RectangularButton = ({title, onPress, style})=>(
    <TouchableOpacity onPress={onPress}>
    <View style={[_style.packagesButton, style]}>
      <Text style={_style.packagesButtonText}>
        {title}
      </Text>
        </View>
    </TouchableOpacity>
  );

export default RectangularButton;