import BackgroundService from "react-native-background-actions";
import updateDataInStorage from "../GlobalFunctions/updateDataInStorage";
import detectParking from "../GlobalFunctions/detectParkings";
import addProbablyParkingLocation from "../GlobalFunctions/addProbablyParkingLocation";
import Geolocation, { clearWatch } from "react-native-geolocation-service";

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

        const watchId = Geolocation.watchPosition(
            async (info) => {
                console.log('coords.speed = ', info.coords.speed);
            },
            (error) => {
                console.log(error);
            },
            {
                enableHighAccuracy: true
            }
        );

        for (let i = 0; BackgroundService.isRunning(); i++) {

            await updateDataInStorage(updatedData);

            // app in stable state - try to detect the parking moment
            if (updatedData.appState === 'stable') {
                let userParked = 0;

                // current ride not checked yet - check for parking
                if (!updatedData.currentRide.parkingChecked) {
                    userParked = await detectParking(updatedData);

                    // the algorithm decided if the user parked or not
                    if (userParked !== -1) {
                        updatedData.currentRide.parkingChecked = true;
                    }
                }

                // saves the parking location in async storage
                if (userParked === 1) {
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

        clearWatch(watchId);
    });
};
