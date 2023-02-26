import BackgroundService from "react-native-background-actions";
import Geolocation from "@react-native-community/geolocation";
import AsyncStorage from '@react-native-async-storage/async-storage';

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

const data = {
    currentLocation: {
        latitude: 31.768319,
        longitude: 35.21371,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    },
    currentSpeed: 0,
    isOnRide: false,
    isCurrentlyCharging: false,
    isCurrentlyUsingBluetooth: false
}

const updateMovementInfo = async (info) => {
    data.currentLocation = {
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
    };
    data.currentSpeed = info.coords.speed;
    data.isOnRide = info.coords.speed > 15;
}

export const parkingDetectionTask = async (taskDataArguments) => {
    const { delay } = taskDataArguments;

    await new Promise( async (resolve) => {

        for (let i = 0; BackgroundService.isRunning(); i++) {
            Geolocation.getCurrentPosition(
                await updateMovementInfo,
                (error) => {
                    console.log(error)
                },
                {
                    enableHighAccuracy: true
                }
            );

            const dataValue = JSON.stringify(data);
            await AsyncStorage.setItem('data', dataValue);

            await sleep(delay);
        }

    });
};
