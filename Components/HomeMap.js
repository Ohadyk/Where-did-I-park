import React, { memo, useEffect, useRef, useState } from "react";
import MapView from "react-native-maps";
import LocationButton from "../Buttons/LocationButton";
import { useSelector } from "react-redux";
import { View } from "react-native";

const HomeMap = () => {

    const currentLocation = useSelector(state => state.data.currentLocation);

    const mapRef = useRef(null);

    useEffect(() => {
        if(mapRef.current) {
            mapRef.current.animateToRegion(currentLocation);
        }
    }, [currentLocation]);

    return (
        <View style={{flex: 1}}>
            <MapView
                style={{flex: 1, width: '100%'}}
                ref={mapRef}
                region={currentLocation}
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
