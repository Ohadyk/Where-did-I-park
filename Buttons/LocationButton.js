import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Geolocation from "@react-native-community/geolocation";
import GlobalStyle from "../StyleSheet/GlobalStyle";
import Icon from 'react-native-vector-icons/FontAwesome5';

const LocationButton = (props) => {

    const animateToLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude
                const longitude = position.coords.longitude

                const location = {
                    latitude,
                    longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                }

                props.mapRef.current.animateToRegion(location, 500)
            },
            error => console.log(error.message),

            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        )
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
        right: 28,
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
