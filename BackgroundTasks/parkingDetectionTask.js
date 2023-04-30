import BackgroundService from "react-native-background-actions";
import { Alert, PermissionsAndroid } from "react-native";
import updateDataInStorage from "../GlobalFunctions/updateDataInStorage";
import detectParking from "../GlobalFunctions/detectParkings";
import updateDataInFirestore from "../GlobalFunctions/updateDataInFirestore";
import writeDataToStorage from "../GlobalFunctions/writeDataToStorage";
import addProbablyParkingLocation from "../GlobalFunctions/addProbablyParkingLocation";
import BleManager from "react-native-ble-manager";

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

export const parkingDetectionTask = async (taskDataArguments) => {
    const { delay } = taskDataArguments;

    await new Promise( async (resolve) => {

        // const locationPermissions = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        //
        // if (locationPermissions === 'denied') {
        //     console.log('location permissions denied');
        //     Alert.alert("שגיאה", "אפשר/י גישה למיקום המכשיר כדי שהאפליקציה תוכל לעבוד");
        //     BackgroundService.stop().then(r => {});
        // }

        let previousData = taskDataArguments.initialData;
        let updatedData = {
            currentLocation: {},
            learnedRides: [],
            currentRide: {},
            probablyParkingLocations: []
        };

        BleManager.start({ showAlert: false }).then(() => {
            console.log("BleManager Module initialized");
        });

        for (let i = 0; BackgroundService.isRunning(); i++) {
            await updateDataInStorage(updatedData, previousData);

            // try to detect the parking moment
            if (updatedData.appState === 'stable') {

                const userParked = await detectParking(updatedData);

                // saves the parking location in storage
                if (userParked) {
                    const parkingData = {
                        date: Date.now(),
                        parkedVehicleLocation: {
                            latitude: updatedData.currentLocation.latitude,
                            longitude: updatedData.currentLocation.longitude
                        }
                    };

                    await addProbablyParkingLocation(updatedData.probablyParkingLocations, parkingData);
                }
            }

            // console.log('previous.isOnRide = ', previousData.isOnRide);
            // console.log('data.isOnRide = ', updatedData.isOnRide);
            // console.log('------------------------------------------');

            previousData.isOnRide = updatedData.isOnRide;
            previousData.currentRide = updatedData.currentRide;
            await sleep(delay);
        }

    });
};
