import React from "react";
import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import GlobalStyle from "../StyleSheet/GlobalStyle";
import Icon from "react-native-vector-icons/FontAwesome5";
import Geolocation from "react-native-geolocation-service";

const LocationButton = (props) => {

    const animateToLocation = () => {
        Geolocation.getCurrentPosition(
            (info) => {
                const location = {
                    latitude: info.coords.latitude,
                    longitude: info.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                }

                props.mapRef.current.animateToRegion(location, 500);
            },
            (error) => {
                console.log(error);
                if (error.message === "Location permission not granted.") {
                    Alert.alert("שגיאה", "אפשר/י גישה למיקום המכשיר כדי שהאפליקציה תוכל לעבוד כראוי");
                }
                else {
                    Alert.alert("שגיאה", "משהו השתבש");
                }
            },
            {
                enableHighAccuracy: true
            }
        );
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
