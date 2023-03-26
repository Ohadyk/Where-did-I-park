import Geolocation from "react-native-geolocation-service";
import DeviceInfo from "react-native-device-info";
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import writeDataToStorage from "./writeDataToStorage";
import readDataFromStorage from "./readDataFromStorage";
import updateUserBehavior from "./updateUserBehavior";

const data = {}

// read the wanted app state from async storage and sets the needed app state
const updateAppState = async () => {
    const persistData = await readDataFromStorage('data');
    const internalUsageData = await readDataFromStorage('internalUsageData');

    if(persistData.appState === 'learning' && internalUsageData.wantedAppState === 'stable') {
        data.appState = 'stable';
        await updateUserBehavior(internalUsageData);
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
    data.currentRide = {
        chargedDuringTheRide: false,
        usedBluetoothDuringTheRide: false
    };

    if(data.isOnRide && (data.batteryState === 'charging' || data.batteryState === 'full')) {
        data.currentRide.chargedDuringTheRide = true;
    }

    if(data.isOnRide && data.bluetoothConnected) {
        data.currentRide.usedBluetoothDuringTheRide = true;
    }
};

// updates the bluetooth state
const updateBluetoothState = async () => {
    const bluetoothEnabled = await RNBluetoothClassic.isBluetoothEnabled();

    data.bluetoothConnected = bluetoothEnabled;
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
    data.isOnRide = info.coords.speed > 7;
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
    await updateBluetoothState();
    await updateCurrentRideParams();

    await updateAppState();

    await writeDataToStorage('data', data, true);

    return data;
};

export default updateDataInStorage;
