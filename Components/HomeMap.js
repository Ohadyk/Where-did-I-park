import React, { memo, useEffect, useRef, useState } from "react";
import MapView from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import LocationButton from "../Buttons/LocationButton";
import { useDispatch } from "react-redux";
import { dataActions } from "../store/dataSlice";
import { View } from "react-native";

const HomeMap = () => {

    const [userLocation, setUserLocation] = useState({
        latitude: 31.768319,
        longitude: 35.21371,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    });

    const dispatch = useDispatch();

    const mapRef = useRef(null);

    // updates the user's current location, speed and ride state in the redux
    const locationUpdate = position => {
        if(mapRef.current) {

            const currentSpeed = position.coords.speed;
            const currentLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }
            mapRef.current.animateToRegion(currentLocation);

            dispatch(dataActions.setCurrentLocation(currentLocation))
            dispatch(dataActions.setCurrentSpeed(currentSpeed));

            if(currentSpeed > 15) {
                dispatch(dataActions.setIsOnRide(true))
            }
        }
        console.log('position = ', position)
    }

    // init user location tracker to receive the current location and speed
    const initUserLocationTracker = () => {
        return Geolocation.watchPosition(
            (position) => {
                locationUpdate(position);
            },
            (error) => {
                console.log(error)
            },
            {
                enableHighAccuracy: true,
                distanceFilter: 10,
                maximumAge: 0
            }
        );
    }

    useEffect(() => {
        const watchId = initUserLocationTracker();

        Geolocation.clearWatch(watchId);
    }, [])

    return (
        <View style={{flex: 1}}>
            <MapView
                style={{flex: 1, width: '100%'}}
                ref={mapRef}
                initialRegion={userLocation}
                showsUserLocation={true}
                showsMyLocationButton={false}
                showsBuildings={true}
                loadingEnabled={true}
            />
            <LocationButton mapRef={mapRef} />
        </View>
    );
};

export default memo(HomeMap);
