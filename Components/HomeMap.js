import React, { memo, useEffect, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import LocationButton from "../Buttons/LocationButton";
import { useSelector } from "react-redux";
import { View } from "react-native";
import CustomIcon from "../Components/CustomIcon";

const HomeMap = () => {

    const currentLocation = useSelector(state => state.data.currentLocation);
    const probablyParkingLocations = useSelector(state => state.data.learnedRides);
    const parkedVehicleLocation = useSelector(state => state.internalUsageData.parkedVehicleLocation);

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
            >
                {parkedVehicleLocation &&
                    <Marker coordinate={{ latitude: parkedVehicleLocation.latitude, longitude: parkedVehicleLocation.longitude }}>
                        <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 2 }}>
                            <CustomIcon name='parking-icon' size={45} color="#0047FF" />
                        </View>
                    </Marker>
                }
                {/*{probablyParkingLocations && probablyParkingLocations.map(ride => (*/}
                {/*    <Marker key={ride.date} coordinate={{ latitude: ride.parkingLocation.latitude, longitude: ride.parkingLocation.longitude }}>*/}
                {/*        <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 2 }}>*/}
                {/*            <CustomIcon name='parking-icon' size={45} color="#0047FF" />*/}
                {/*        </View>*/}
                {/*    </Marker>*/}
                {/*))}*/}
            </MapView>
            <LocationButton mapRef={mapRef} />
        </View>
    );
};

export default memo(HomeMap);
