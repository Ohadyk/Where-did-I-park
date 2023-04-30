import React, { useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { ActivityIndicator, Alert, StyleSheet, TouchableOpacity } from "react-native";
import GlobalStyle from "../StyleSheet/GlobalStyle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LinearGradient from "react-native-linear-gradient";
import { LINEAR_GRADIENT_BLUE, LINEAR_GRADIENT_GREY } from "../StyleSheet/GlobalColors";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../store/dataSlice";
import { internalUsageDataActions } from "../store/internalUsageDataSlice";
import writeDataToStorage from "../GlobalFunctions/writeDataToStorage";
import updateDataInFirestore from "../GlobalFunctions/updateDataInFirestore";

const IParkedButton = () => {

    const [loading, setLoading] = useState(false);

    const appState = useSelector(state => state.data.appState);
    const isOnRide = useSelector(state => state.data.isOnRide);
    const learnedRides = useSelector(state => state.data.learnedRides);
    const numOfLearnedRides = useSelector(state => state.data.numOfLearnedRides);
    const currentLocation = useSelector(state => state.data.currentLocation);
    const currentRide = useSelector(state => state.data.currentRide);

    const dispatch = useDispatch();

    /* updates the learned ride data in firestore, storage and redux
       and saves the current location as the parking location */
    const updateLearnedRideData = async () => {
        try {
            let rides = [...learnedRides];
            const ride = {
                date: Date.now(),
                parkingLocation: {
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                },
                chargedDuringTheRide: currentRide.chargedDuringTheRide,
                usedBluetoothDuringTheRide: currentRide.usedBluetoothDuringTheRide,
            };
            rides.push(ride);

            const userData = {
                learnedRides: firestore.FieldValue.arrayUnion(ride),
                numOfLearnedRides: firestore.FieldValue.increment(1),
                parkedVehicleLocation: ride.parkingLocation
            };
            await updateDataInFirestore(userData);

            const persistData = {
                learnedRides: rides,
                numOfLearnedRides: numOfLearnedRides+1,
                currentRide: {
                    chargedDuringTheRide: false,
                    usedBluetoothDuringTheRide: false
                }
            };

            const internalData = {
                updatedLearnedRides: rides,
                parkedVehicleLocation: {
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                }
            };

            await writeDataToStorage('data', persistData, true);
            await writeDataToStorage('internalUsageData', internalData, true);

            dispatch(internalUsageDataActions.setParkedVehicleLocation(internalData.parkedVehicleLocation));
            dispatch(dataActions.addLearnedRide(ride));
        }
        catch (error) {
            console.log(error);
            Alert.alert("שגיאה", "אנא נסה שוב");
        }
    };

    // changes the app state to stable state. updates database and async storage
    const setStableAppState = async () => {
        try {
            const numOfLearnedRides = {numOfLearnedRides: 0};
            const wantedAppState = {wantedAppState: 'stable'};

            await writeDataToStorage('data', numOfLearnedRides, true);
            await writeDataToStorage('internalUsageData', wantedAppState, true);

            dispatch(dataActions.resetLearnedRides());
            dispatch(dataActions.resetNumOfLearnedRides());
        }
        catch (error) {
            console.log(error);
        }
    };

    // handles the parking event. saves the location and checks heuristics
    const parkingHandler = async () => {
        setLoading(true);

        if (appState === 'stable') {
            return;
        }

        // saves the current location as the parking location and ride params for heuristics
        await updateLearnedRideData();

        // app finished learn the user behavior, switch to stable state
        if (numOfLearnedRides + 1 >= 5) {
            await setStableAppState();
        }
        else {
            dispatch(dataActions.incNumOfLearnedRides());
        }

        setLoading(false);
    };

    return (
        <Animated.View
            style={styles.parkedContainer}
            entering={SlideInDown.duration(700).delay(1000)}
            exiting={SlideOutDown.duration(500).delay(0)}
        >
            {loading ?
                <ActivityIndicator style={{alignSelf: 'center', margin: 20, bottom: 25}} color="#0047FF" size="large" />
                :
                <TouchableOpacity underlayColor="white" activeOpacity={0.7} onPress={parkingHandler} disabled={isOnRide}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={isOnRide ? LINEAR_GRADIENT_GREY : LINEAR_GRADIENT_BLUE}
                        style={[styles.parkedButton, GlobalStyle.shadow]}
                    >
                        <Icon type="material-community-icons" name="car-brake-parking" style={styles.icon} />
                    </LinearGradient>
                </TouchableOpacity>
            }
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    parkedContainer: {
        position: "absolute",
        alignSelf: "center",
        width: "35%",
        bottom: 0,
    },

    parkedButton: {
        alignItems: "center",
        width: "100%",
        height: "100%",
        alignSelf: "center",
        bottom: 30,
        padding: 5,
        borderRadius: 100,
        borderWidth: 0,
    },

    parkedGradient: {
        bottom: 30,
        padding: 20,
        borderRadius: 100,
        borderWidth: 0,
    },

    parkedButtonTxt: {
        color: "white",
        fontSize: 25,
    },

    icon: {
        textAlign: "center",
        color: "white",
        alignSelf: "center",
        fontSize: 60,
    },
});

export default IParkedButton;
