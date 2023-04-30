import BackgroundService from "react-native-background-actions";
import updateDataInStorage from "../GlobalFunctions/updateDataInStorage";
import detectParking from "../GlobalFunctions/detectParkings";
import addProbablyParkingLocation from "../GlobalFunctions/addProbablyParkingLocation";

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

export const parkingDetectionTask = async (taskDataArguments) => {
    const { delay } = taskDataArguments;

    await new Promise( async (resolve) => {

        let previousData = taskDataArguments.initialData;
        let updatedData = {
            currentLocation: {},
            learnedRides: [],
            currentRide: {},
            probablyParkingLocations: []
        };

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
