import Geolocation from "@react-native-community/geolocation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DeviceInfo from "react-native-device-info";

const data = {
    numOfLearnedRides: 0,
    currentLocation: {
        latitude: 31.768319,
        longitude: 35.21371,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    },
    currentSpeed: 0,
    isOnRide: false,
    batteryState: 'unplugged',
    currentRide: {
        isCurrentlyCharging: false,
        isCurrentlyUsingBluetooth: false
    }
}

const updateBatteryState = async () => {
    DeviceInfo.getPowerState().then(state => {
        data.batteryState = state.batteryState;
    });
};

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

const updateDataInStorage = async () => {

    Geolocation.getCurrentPosition(
        await updateMovementInfo,
        (error) => {
            console.log(error)
        },
        {
            enableHighAccuracy: true
        }
    );
    await updateBatteryState();

    const dataValue = JSON.stringify(data);
    await AsyncStorage.setItem('data', dataValue);
};

export default updateDataInStorage;
