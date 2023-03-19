import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import GlobalStyle from "../StyleSheet/GlobalStyle";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useSelector } from "react-redux";

const LocationButton = (props) => {

    const currentLocation = useSelector(state => state.data.currentLocation);

    const animateToLocation = () => {
        props.mapRef.current.animateToRegion(currentLocation, 500);
    }

    return (
        <TouchableOpacity style={[styles.locationButton, GlobalStyle.shadow]} activeOpacity={0.7} onPress={animateToLocation}>
            <View>
                <Icon type='font-awesome' name='location-arrow' size={25} color='#0047FF' />
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    locationButton: {
        position: 'absolute',
        bottom: 28,
        left: 10,
        backgroundColor: 'white',
        width: 50,
        height: 50,
        borderRadius: 50,
        padding: 0,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default LocationButton;
