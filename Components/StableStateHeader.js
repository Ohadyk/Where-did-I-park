import React from "react";
import { StyleSheet, Text } from "react-native";
import GlobalStyle from "../StyleSheet/GlobalStyle";
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";

const StableStateHeader = () => {

    return(
        <Animated.View
            style={[styles.headerContainer, GlobalStyle.shadow]}
            entering={SlideInRight.duration(700).delay(500)}
            exiting={SlideOutRight.duration(500).delay(0)}
        >
            <Text style={styles.headerTxt}>מצב יציב</Text>
            <Text style={styles.bodyTxt}>השאר את האפליקציה פתוחה כדי שנזהה חניות באופן אוטומטי ונשמור עבורך את מיקום החניה</Text>
        </Animated.View>
    )
};

const styles = StyleSheet.create({
    headerContainer: {
        position: 'absolute',
        alignSelf: 'center',
        width: '75%',
        backgroundColor: 'white',
        top: 0,
        right: 0,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderWidth: 1,
        borderRightWidth: 0,
    },

    headerTxt: {
        textAlign: 'center',
        fontSize: 20,
        // color: '#898989',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },

    bodyTxt: {
        textAlign: 'right',
        fontSize: 16,
        // color: '#898989',
        paddingVertical: 10,
        marginRight: 15,
    }
});

export default StableStateHeader;
