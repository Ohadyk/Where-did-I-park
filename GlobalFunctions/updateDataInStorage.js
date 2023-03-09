import Geolocation from "react-native-geolocation-service";
import DeviceInfo from "react-native-device-info";
import { BluetoothStatus } from "react-native-bluetooth-status";
import writeDataToStorage from "./writeDataToStorage";
import readDataFromStorage from "./readDataFromStorage";

const data = {}

// read the wanted app state from async storage and sets the needed app state
const setStorageAppState = async () => {
    const persistData = await readDataFromStorage('data');
    const internalUsageData = await readDataFromStorage('internalUsageData');

    if(persistData.appState === 'learning' && internalUsageData.wantedAppState === 'stable') {
        data.appState = 'stable';
    }
    else if(persistData.appState === 'stable' && internalUsageData.wantedAppState === 'learning') {
        data.appState = 'learning';
    }
    else if(persistData.appState === 'learning' && internalUsageData.wantedAppState === 'learning') {
        data.appState = 'learning';
    }
    else if(persistData.appState === 'stable' && internalUsageData.wantedAppState === 'stable') {
        data.appState = 'stable';
    }
};

// updates the battery and bluetooth params indicating if the user used them on ride
const updateCurrentRideParams = async () => {
    if(data.isOnRide && (data.batteryState === 'charging' || data.batteryState === 'full')) {
        data.currentRide.chargedDuringTheRide = true;
    }
    if(data.isOnRide && data.bluetoothState) {
        data.currentRide.chargedDuringTheRide = true;
    }
};

// updates the bluetooth state
const updateBluetoothState = async () => {
    data.bluetoothState = BluetoothStatus.state();
};

// updates the battery state
const updateBatteryState = async () => {
    DeviceInfo.getPowerState().then(state => {
        data.batteryState = state.batteryState;
    });
};

// updates the location, speed and whether the user is on ride or not
const updateMovementInfo = async (info) => {
    data.currentLocation = {
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
    };
    data.currentSpeed = info.coords.speed;
    data.isOnRide = info.coords.speed > 15;
};

// updates the data in the async storage and returns the updated data
const updateDataInStorage = async () => {

    Geolocation.getCurrentPosition(
        async (info) => {
            await updateMovementInfo(info)
        },
        (error) => {
            console.log(error);
        },
        {
            enableHighAccuracy: true
        }
    );
    await updateBatteryState();
    await updateBluetoothState();   // ------------------------------------------------------------
    await updateCurrentRideParams();

    await setStorageAppState();

    await writeDataToStorage('data', data, true);

    return data;
};

export default updateDataInStorage;
