import React, { memo } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {useNavigation} from "@react-navigation/native";
import GlobalStyles from "../StyleSheet/GlobalStyle";
import Entypo from "react-native-vector-icons/Entypo";

const DrawerButton = () => {

    const navigation = useNavigation()

    return (
        <TouchableOpacity style={[styles.menuButton, GlobalStyles.shadow]} underlayColor='white' activeOpacity={0.7} onPress={() => navigation.openDrawer()}>
            <View>
                <Entypo name='menu' size={35}/>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    menuButton: {
        position: 'absolute',
        top: 0,
        left: 15,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 100,
        padding: 7,
        marginTop: 15,
    }
})

export default memo(DrawerButton);
