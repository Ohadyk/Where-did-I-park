import React from "react";
import { StyleSheet, Text, View } from "react-native";

const HomeHeader = ({title}) => {

    return(
        <View style={styles.header}>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        width: '100%',
        top: 0,
        padding: 10,
        borderBottomWidth: 1,
        backgroundColor: 'white'
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center'
    }
})

export default HomeHeader;
