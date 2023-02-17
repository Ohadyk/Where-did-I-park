import React, { useEffect, useRef, useState } from "react";
import MapView from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";

const HomeMap = () => {

    const [userLocation, setUserLocation] = useState({
        latitude: 31.768319,
        longitude: 35.21371,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0221,
    });

    const mapRef = useRef(null);

    const getUserLocation = () => {
        Geolocation.watchPosition(
            (position) => {
                if(mapRef.current) {
                    mapRef.current.animateToRegion({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.0322,
                        longitudeDelta: 0.0221,
                    })
                }
                console.log(position)
            },
            (error) => {
                console.log(error)
            },
            {
                interval: 3000,
                enableHighAccuracy: true,
                distanceFilter: 50
            }
        );
    }

    useEffect(() => {
        getUserLocation()

    }, [])

    return (
        <MapView
            style={{width: '100%', height: '100%'}}
            ref={mapRef}
            initialRegion={userLocation}
            showsUserLocation={true}
            showsMyLocationButton={true}
            showsBuildings={true}
            loadingEnabled={true}
        />
    );
};

export default HomeMap;
