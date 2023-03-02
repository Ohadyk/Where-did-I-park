import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import GlobalStyle from "../StyleSheet/GlobalStyle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LinearGradient from "react-native-linear-gradient";
import { LINEAR_GRADIENT_BLUE, LINEAR_GRADIENT_GREY } from "../StyleSheet/GlobalColors";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../store/dataSlice";
import readDataFromStorage from "../GlobalFunctions/readDataFromStorage";
import writeDataToStorage from "../GlobalFunctions/writeDataToStorage";

const IParkedButton = () => {

    const isOnRide = useSelector(state => state.data.isOnRide);

    const dispatch = useDispatch();

    const parkedHandler = async () => {
        console.log('I parked');
        const persistData = readDataFromStorage();
        if(persistData) {
            persistData.appState = 'stable';
            await writeDataToStorage(persistData);
            dispatch(dataActions.setAppState('stable'));
        }
    };

    return (
        <Animated.View
            style={styles.parkedContainer}
            entering={SlideInDown.duration(700).delay(1000)}
            exiting={SlideOutDown.duration(500).delay(0)}
        >
            <TouchableOpacity underlayColor='white' activeOpacity={0.7} onPress={parkedHandler} disabled={isOnRide}>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={isOnRide ? LINEAR_GRADIENT_GREY : LINEAR_GRADIENT_BLUE}
                    style={[styles.parkedButton, GlobalStyle.shadow]}
                >
                    <Icon type='material-community-icons' name='car-brake-parking' style={styles.icon} />
                </LinearGradient>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    parkedContainer: {
        position: 'absolute',
        alignSelf: 'center',
        width: '35%',
        bottom: 0,
    },

    parkedButton: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        bottom: 30,
        padding: 5,
        borderRadius: 100,
        borderWidth: 0,
    },

    parkedGradient: {
        bottom: 30,
        padding: 20,
        borderRadius: 100,
        borderWidth: 0,
    },

    parkedButtonTxt: {
        color: 'white',
        fontSize: 25,
    },

    icon: {
        textAlign: 'center',
        color: 'white',
        alignSelf: 'center',
        fontSize: 60,
    },
});

export default IParkedButton;
