import { Alert, PermissionsAndroid } from "react-native";

const requestPermissions = async () => {

    const fineLocationPermissions = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (fineLocationPermissions === 'denied') {
        console.log('location permissions denied');
        Alert.alert("שגיאה", "אפשר/י גישה למיקום המכשיר כדי שהאפליקציה תוכל לעבוד כראוי");
        return false;
    }
    // else {
        const alwaysLocationPermissions = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION);
        if (alwaysLocationPermissions === 'denied') {
            console.log('background location permissions denied');
            Alert.alert("שגיאה", "אפשר/י גישה למיקום המכשיר ברקע כדי שהאפליקציה תוכל לעבוד כראוי");
            return false;
        }
    // }

    const bleScanPermissions = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN);
    if (bleScanPermissions === 'denied') {
        console.log('bluetooth permissions denied');
        Alert.alert("שגיאה", "אפשר/י גישה לבלוטות' כדי שהאפליקציה תוכל לעבוד כראוי");
        return false;
    }

    const bleConnectPermissions = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT);
    if (bleConnectPermissions === 'denied') {
        console.log('bluetooth permissions denied');
        Alert.alert("שגיאה", "אפשר/י גישה לבלוטות' כדי שהאפליקציה תוכל לעבוד כראוי");
        return false;
    }

    return true;
};

export default requestPermissions;
