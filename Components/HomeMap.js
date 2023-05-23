import React, { memo, useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
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

    const currentLocation = useSelector(state => state.data.currentLocation);
    const probablyParkingLocations = useSelector(state => state.internalUsageData.probablyParkingLocations);
    const parkedVehicleLocation = useSelector(state => state.internalUsageData.parkedVehicleLocation);

    const mapRef = useRef(null);

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.animateToRegion(currentLocation, 1000);
        }

    }, [currentLocation]);

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
                {/*{(appState === 'learning') && parkedVehicleLocation &&*/}
                {parkedVehicleLocation &&
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
