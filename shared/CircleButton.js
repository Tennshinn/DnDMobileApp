import style from "../styles/style";
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

export default function CircleButton({ title, onPress, visible }) {
    return <View style={[style.packagesAddNewContainer, {display:visible?"flex":"none"}]}>
        <View style={[style.packagesAddButton, { backgroundColor: "black" }]}>
            <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
                <View style={style.packagesAddButton}>
                    <Text style={style.packagesAddButtonText}>
                        {title}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    </View>
}