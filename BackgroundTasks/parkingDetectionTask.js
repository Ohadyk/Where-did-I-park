import BackgroundService from "react-native-background-actions";
import updateDataInStorage from "../GlobalFunctions/updateDataInStorage";
import detectParking from "../GlobalFunctions/detectParkings";
import addProbablyParkingLocation from "../GlobalFunctions/addProbablyParkingLocation";
import askParkingNotification from "../GlobalFunctions/askParkingNotification";
import updateDataInFirestore from "../GlobalFunctions/updateDataInFirestore";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import readDataFromStorage from "../GlobalFunctions/readDataFromStorage";

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

export const parkingDetectionTask = async (taskDataArguments) => {
    const { delay } = taskDataArguments;

    await new Promise( async (resolve) => {

        let updatedData = {
            isOnRide: false,
            currentRide: {
                finishedRide: false,
                chargerDisconnected: false,
                bluetoothDisconnected: false,
                chargedDuringTheRide: false,
                usedBluetoothDuringTheRide: false,
                parkingChecked: false
            },
            probablyParkingLocations: []
        };

        for (let i = 0; BackgroundService.isRunning(); i++) {

            await updateDataInStorage(updatedData);

            // console.log('i = ', i);
            // const storageData = await readDataFromStorage('data');
            // console.log('storageData.isOnRide = ', storageData.isOnRide);

            // try to detect the parking moment
            if (updatedData.appState === 'stable') {
                let userParked = false;

                // current ride not checked yet - check for parking
                if (!updatedData.currentRide.parkingChecked) {
                    userParked = await detectParking(updatedData);
                    updatedData.currentRide.parkingChecked = true;
                }

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

            await sleep(delay);
        }

    });
};
