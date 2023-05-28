import React from "react";
import { StyleSheet, Text } from "react-native";
import GlobalStyle from "../StyleSheet/GlobalStyle";
import Animated, { SlideInUp, SlideOutUp } from "react-native-reanimated";

const StableStateCard = () => {

    return(
        <Animated.View
            style={[styles.headerContainer, GlobalStyle.shadow]}
            entering={SlideInUp.duration(700).delay(500)}
            exiting={SlideOutUp.duration(500).delay(0)}
        >
            <Text style={styles.bodyTxt}>השאר/י את האפליקציה פועלת כדי שנזהה חניות באופן אוטומטי ונשמור עבורך את מיקום הרכב</Text>
        </Animated.View>
    )
};

const styles = StyleSheet.create({
    headerContainer: {
        position: 'absolute',
        alignSelf: 'center',
        width: '75%',
        backgroundColor: 'white',
        marginTop: 5,
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
        textAlign: 'center',
        fontSize: 16,
        // color: '#898989',
        paddingVertical: 10,
        marginHorizontal: 15,
    }
});

export default StableStateCard;
