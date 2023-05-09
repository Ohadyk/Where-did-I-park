import Geolocation from "react-native-geolocation-service";
import DeviceInfo from "react-native-device-info";
import writeDataToStorage from "./writeDataToStorage";
import readDataFromStorage from "./readDataFromStorage";
import updateUserBehavior from "./updateUserBehavior";
import updateDataInFirestore from "./updateDataInFirestore";
import BleManager from "react-native-ble-manager";
import RNBluetoothClassic from "react-native-bluetooth-classic";

// read the wanted app state from async storage and sets the needed app state. updates in firestore and async storage
const updateAppState = async (data) => {
    const persistData = await readDataFromStorage('data');
    const internalUsageData = await readDataFromStorage('internalUsageData');

    data.probablyParkingLocations = internalUsageData.probablyParkingLocations;

    data.userConnectingToCharger = persistData.userConnectingToCharger;
    data.userConnectingToBluetooth = persistData.userConnectingToBluetooth;

    // change to stable state
    if(persistData.appState === 'learning' && internalUsageData.wantedAppState === 'stable') {
        data.appState = 'stable';

        const userBehavior = await updateUserBehavior(internalUsageData);

        const userData = {
            appState: 'stable',
            userConnectingToCharger: userBehavior.userConnectingToCharger,
            userConnectingToBluetooth: userBehavior.userConnectingToBluetooth,
            learnedRides: [],
            numOfLearnedRides: 0,
            wrongDetectedParking: 0
        }
        await updateDataInFirestore(userData);
    }
    // change to learning state
    else if(persistData.appState === 'stable' && internalUsageData.wantedAppState === 'learning') {
        data.appState = 'learning';
        data.probablyParkingLocations = [];
        data.wrongDetectedParking = 0;

        const internalData = {
            probablyParkingLocations: [],
            wrongDetectedParking: 0
        };
        const userData = {
            appState: 'learning',
            learnedRides: [],
            numOfLearnedRides: 0,
            wrongDetectedParking: 0
        }
        await updateDataInFirestore(userData);
        await writeDataToStorage('internalUsageData', internalData, true);
    }
    // stay in learning state
    else if(persistData.appState === 'learning' && internalUsageData.wantedAppState === 'learning') {
        data.appState = 'learning';
        data.probablyParkingLocations = [];

        const internalData = {
            probablyParkingLocations: [],
            wrongDetectedParking: 0
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

    // user speed has dropped drastically
    if (previousData.isOnRide && !data.isOnRide) {
        data.currentRide.finishedRide = true;
        data.currentRide.parkingChecked = false;
    }

    if (data.isOnRide) {
        // the user is on ride and also charging the phone
        if (data.batteryState === 'charging' || data.batteryState === 'full') {
            data.currentRide.chargedDuringTheRide = true;
        }
        // the user is on ride and also using bluetooth
        if (data.bluetoothConnected) {
            data.currentRide.usedBluetoothDuringTheRide = true;
        }
    }

    // user charged during the ride and unplugged the charger
    if (data.currentRide.finishedRide &&
            data.currentRide.chargedDuringTheRide && data.batteryState === 'unplugged') {
        data.currentRide.chargerDisconnected = true;
    }
    // user used bluetooth during the ride and disconnected it
    if (data.currentRide.finishedRide &&
            data.currentRide.usedBluetoothDuringTheRide && !data.bluetoothConnected) {
        data.currentRide.bluetoothDisconnected = true;
    }

    // the user may have started a ride - reset all the params of current ride
    if (!previousData.isOnRide && data.isOnRide) {
        data.currentRide.finishedRide = false;
        data.currentRide.chargerDisconnected = false;
        data.currentRide.bluetoothDisconnected = false;
        data.currentRide.chargedDuringTheRide = false;
        data.currentRide.usedBluetoothDuringTheRide = false;
        data.currentRide.parkingChecked = true;
    }

    // the user stay in same state - on ride
    if (previousData.isOnRide && data.isOnRide) {
        data.currentRide.parkingChecked = true;
    }
    // the user stay in same state - not on ride
    if (!previousData.isOnRide && !data.isOnRide) {
        data.currentRide.parkingChecked = true;
    }

};

// updates the bluetooth state
const updateBluetoothState = async (data) => {
    data.bluetoothConnected = await RNBluetoothClassic.isBluetoothEnabled();

    // BleManager.getBondedPeripherals([]).then((bondedPeripheralsArray) => {
    //     // Each peripheral in returned array will have id and name properties
    //     console.log("Bonded peripherals: " + bondedPeripheralsArray.length);
    //
    //     bondedPeripheralsArray.forEach(peripheral => {
    //
    //         console.log('peripheral.id = ', peripheral.id)
    //
    //         BleManager.isPeripheralConnected(
    //             peripheral.id,
    //             []
    //
    //         ).then(isConnected => {
    //             if (isConnected) {
    //                 console.log("Peripheral is connected!");
    //
    //             } else {
    //                 console.log("Peripheral is NOT connected!");
    //             }
    //         });
    //     });
    // });

    // BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
    //     if (peripheralsArray.length > 0) {
    //         console.log('Device is connected to a Bluetooth device.');
    //         console.log('peripheralsArray = ', peripheralsArray);
    //     } else {
    //         console.log('Device is not connected to a Bluetooth device.');
    //         console.log('peripheralsArray = ', peripheralsArray);
    //     }
    //
    // }).catch((error) => {
    //     console.log('Error:', error);
    // });

};

// updates the battery state
const updateBatteryState = async (data) => {
    DeviceInfo.getPowerState().then(state => {
        data.batteryState = state.batteryState;
    });
};

// updates all the fields of the data and stores it in the async storage
const updateData = async (data, info, previousData) => {
    data.currentLocation = {
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
    };
    data.currentSpeed = info.coords.speed;
    data.isOnRide = info.coords.speed >= 6;

    await updateBatteryState(data);
    await updateBluetoothState(data);
    await updateCurrentRideParams(data, previousData);

    await updateAppState(data);

    await writeDataToStorage('data', data, true);
    // console.log('data written to storage');
};

// updates the data in the async storage
const updateDataInStorage = async (data) => {
    const previousData = Object.assign({}, data);

    await Geolocation.getCurrentPosition(
        async (info) => {
            await updateData(data, info, previousData);
        },
        (error) => {
            console.log(error);
        },
        {
            enableHighAccuracy: true
        }
    );

};

export default updateDataInStorage;
