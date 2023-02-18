import React, { useEffect, useRef, useState } from "react";
import MapView from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import LocationButton from "../Buttons/LocationButton";

const HomeMap = () => {

    const [userLocation, setUserLocation] = useState({
        latitude: 31.768319,
        longitude: 35.21371,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    });

    const mapRef = useRef(null);

    const getUserLocation = () => {
        Geolocation.watchPosition(
            (position) => {
                if(mapRef.current) {
                    mapRef.current.animateToRegion({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.005,
                        longitudeDelta: 0.005,
                    })
                }
                // console.log(position)
            },
            (error) => {
                console.log(error)
            },
            {
                enableHighAccuracy: true,
                distanceFilter: 10
            }
        );
    }

    useEffect(() => {
        getUserLocation()

    }, [])

    return (
        <>
            <MapView
                style={{width: '100%', height: '100%'}}
                ref={mapRef}
                initialRegion={userLocation}
                showsUserLocation={true}
                showsMyLocationButton={false}
                showsBuildings={true}
                loadingEnabled={true}
            />
            <LocationButton mapRef={mapRef} />
        </>
    );
};

export default HomeMap;
