import Geolocation from "react-native-geolocation-service";
import DeviceInfo from "react-native-device-info";
import RNBluetoothClassic from "react-native-bluetooth-classic";
import writeDataToStorage from "./writeDataToStorage";
import readDataFromStorage from "./readDataFromStorage";
import updateUserBehavior from "./updateUserBehavior";

// read the wanted app state from async storage and sets the needed app state
const updateAppState = async (data) => {
    const persistData = await readDataFromStorage('data');
    const internalUsageData = await readDataFromStorage('internalUsageData');

    data.probablyParkingLocations = internalUsageData.probablyParkingLocations;

    data.userConnectingToCharger = persistData.userConnectingToCharger;
    data.userConnectingToBluetooth = persistData.userConnectingToBluetooth;

    // change to stable state
    if(persistData.appState === 'learning' && internalUsageData.wantedAppState === 'stable') {
        data.appState = 'stable';
        await updateUserBehavior(internalUsageData);
    }
    // change to learning state
    else if(persistData.appState === 'stable' && internalUsageData.wantedAppState === 'learning') {
        data.appState = 'learning';
        data.probablyParkingLocations = [];

        const internalData = {
            probablyParkingLocations: []
        };
        await writeDataToStorage('internalUsageData', internalData, true);
    }
    // stay in learning state
    else if(persistData.appState === 'learning' && internalUsageData.wantedAppState === 'learning') {
        data.appState = 'learning';
        data.probablyParkingLocations = [];

        const internalData = {
            probablyParkingLocations: []
        };
        await writeDataToStorage('internalUsageData', internalData, true);
    }
    // stay in stable state
    else if(persistData.appState === 'stable' && internalUsageData.wantedAppState === 'stable') {
        data.appState = 'stable';
    }
};

// updates the battery and bluetooth params indicating if the user used them on ride
const updateCurrentRideParams = async (data, previousData) => {

    // data.currentRide = previousData.currentRide;

    // console.log('--------------------------------------------------');
    // console.log('\tprevious = ', previousData.isOnRide);
    // console.log('\tdata = ', data.isOnRide);
    // console.log('--------------------------------------------------');

    // user charged during the ride and unplugged the charger
    if (previousData.currentRide.chargedDuringTheRide && data.batteryState === 'unplugged') {
        data.currentRide.chargerDisconnected = true;
    }
    // user used bluetooth during the ride and disconnected it
    if (previousData.currentRide.usedBluetoothDuringTheRide && !data.bluetoothConnected) {
        data.currentRide.bluetoothDisconnected = true;
    }

    // user speed has dropped drastically
    if (previousData.isOnRide && !data.isOnRide) {
        data.currentRide.finishedRide = true;
    }
    // the user may have started ride - reset all the params of current ride
    else if (!previousData.isOnRide && data.isOnRide) {
        data.currentRide.finishedRide = false;
        data.currentRide.chargerDisconnected = false;
        data.currentRide.bluetoothDisconnected = false;
        data.currentRide.chargedDuringTheRide = false;
        data.currentRide.usedBluetoothDuringTheRide = false;
    }
    // the ride state stay the same
    else {
        data.currentRide.finishedRide = false;
    }

    if (data.isOnRide && (data.batteryState === 'charging' || data.batteryState === 'full')) {
        data.currentRide.chargedDuringTheRide = true;
    }

    if (data.isOnRide && data.bluetoothConnected) {
        data.currentRide.usedBluetoothDuringTheRide = true;
    }

};

// updates the bluetooth state
const updateBluetoothState = async (data) => {
    data.bluetoothConnected = await RNBluetoothClassic.isBluetoothEnabled();
};

// updates the battery state
const updateBatteryState = async (data) => {
    DeviceInfo.getPowerState().then(state => {
        data.batteryState = state.batteryState;
    });
};

// updates the location, speed and whether the user is on ride or not
const updateMovementInfo = async (data, info) => {
    data.currentLocation = {
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
    };
    data.currentSpeed = info.coords.speed;
    data.isOnRide = info.coords.speed >= 35;
    // console.log('currentSpeed = ', data.currentSpeed);   // ---------------------------------------------
};

// updates the data in the async storage and returns the updated data
const updateDataInStorage = async (data, previousData) => {

    await Geolocation.getCurrentPosition(
        async (info) => {
            await updateMovementInfo(data, info);
        },
        (error) => {
            console.log(error);
        },
        {
            enableHighAccuracy: true
        }
    );
    await updateBatteryState(data);
    await updateBluetoothState(data);
    await updateCurrentRideParams(data, previousData);

    await updateAppState(data);

    await writeDataToStorage('data', data, true);

};

export default updateDataInStorage;
