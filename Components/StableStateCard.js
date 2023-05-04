import React from "react";
import { StyleSheet, Text } from "react-native";
import GlobalStyle from "../StyleSheet/GlobalStyle";
import Animated, { SlideInUp, SlideOutUp } from "react-native-reanimated";
import { useSelector } from "react-redux";

const StableStateCard = () => {

    const batteryState = useSelector(state => state.data.batteryState);
    const bluetoothConnected = useSelector(state => state.data.bluetoothConnected);
    const currentRide = useSelector(state => state.data.currentRide);

    return(
        <Animated.View
            style={[styles.headerContainer, GlobalStyle.shadow]}
            entering={SlideInUp.duration(700).delay(500)}
            exiting={SlideOutUp.duration(500).delay(0)}
        >
            {/*<Text style={styles.bodyTxt}>השאר/י את האפליקציה פתוחה על מנת שנזהה חניות באופן אוטומטי ונשמור עבורך את מיקום הרכב</Text>*/}
            <Text style={styles.bodyTxt}>batteryState = {batteryState.toString()}</Text>
            <Text style={styles.bodyTxt}>bluetoothConnected = {bluetoothConnected.toString()}</Text>
            <Text style={styles.bodyTxt}>finishedRide = {currentRide.finishedRide.toString()}</Text>
            <Text style={styles.bodyTxt}>chargedDuringTheRide = {currentRide.chargedDuringTheRide.toString()}</Text>
            <Text style={styles.bodyTxt}>usedBluetoothDuringTheRide = {currentRide.usedBluetoothDuringTheRide.toString()}</Text>
            <Text style={styles.bodyTxt}>chargerDisconnected = {currentRide.chargerDisconnected.toString()}</Text>
            <Text style={styles.bodyTxt}>bluetoothDisconnected = {currentRide.bluetoothDisconnected.toString()}</Text>
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
