import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import GlobalStyle from "../StyleSheet/GlobalStyle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LinearGradient from "react-native-linear-gradient";
import { LINEAR_GRADIENT_BLUE } from "../StyleSheet/GlobalColors";
import Animated, { BounceInDown } from "react-native-reanimated";

const IParkedButton = () => {

    const IParked = () => {
        console.log('I parked')
    }

    return (
        <Animated.View
            style={styles.parkedContainer}
            entering={BounceInDown.duration(700).delay(1000)}
        >
            <TouchableOpacity underlayColor='white' activeOpacity={0.7} onPress={IParked}>
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={LINEAR_GRADIENT_BLUE}
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
        width: '35%',
        bottom: 0,
        alignSelf: 'center',
    },

    parkedButton: {
        alignItems: 'center',
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        bottom: 30,
        padding: 10,
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
