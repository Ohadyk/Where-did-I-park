import React, { memo, useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import LocationButton from "../Buttons/LocationButton";
import { useSelector } from "react-redux";
import { View } from "react-native";
import CustomIcon from "../Components/CustomIcon";

const region = {
    latitude: 31.768319,
    longitude: 35.21371,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05
};

const HomeMap = () => {

    const appState = useSelector(state => state.data.appState);
    const probablyParkingLocations = useSelector(state => state.internalUsageData.probablyParkingLocations);
    const parkedVehicleLocation = useSelector(state => state.internalUsageData.parkedVehicleLocation);

    console.log('probablyParkingLocations = ', probablyParkingLocations);

    const mapRef = useRef(null);

    const setWatchPosition = () => {
        return Geolocation.watchPosition(
            (position) => {
                const location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005
                }
                if (mapRef.current) {
                    mapRef.current.animateToRegion(location, 1000);
                }
            },
            (error) => {
                console.log(error);
            },
            {
                enableHighAccuracy: true,
                distanceFilter: 0,
                interval: 5000
            }
        );
    };

    useEffect(() => {

        const watchId = setWatchPosition();

        return () => { Geolocation.clearWatch(watchId) }

    }, []);

    return (
        <View style={{flex: 1}}>
            <MapView
                style={{flex: 1, width: '100%'}}
                ref={mapRef}
                region={region}
                showsUserLocation={true}
                followUserLocation={true}
                showsMyLocationButton={false}
                showsBuildings={true}
                loadingEnabled={true}
            >
                {(appState === 'learning') && parkedVehicleLocation &&
                    <Marker coordinate={{ latitude: parkedVehicleLocation.latitude, longitude: parkedVehicleLocation.longitude }}>
                        <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 2 }}>
                            <CustomIcon name='parking-icon' size={45} color="#0047FF" />
                        </View>
                    </Marker>
                }
                {probablyParkingLocations && probablyParkingLocations.map(ride => (
                    <Marker key={ride.date} coordinate={{ latitude: ride.parkedVehicleLocation.latitude, longitude: ride.parkedVehicleLocation.longitude }}>
                        <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 2 }}>
                            <CustomIcon name='parking-icon' size={45} color="#0047FF" />
                        </View>
                    </Marker>
                ))}
            </MapView>
            <LocationButton mapRef={mapRef} />
        </View>
    );
};

export default memo(HomeMap);
