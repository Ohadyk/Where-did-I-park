import "react-native-gesture-handler";
import { Alert, PermissionsAndroid, StatusBar } from "react-native";
import { useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import ForgotPassword from "./Screens/ForgotPassword";
import DrawerContainer from "./Components/DrawerContainer";
import SplashScreen from "react-native-splash-screen";
import auth from "@react-native-firebase/auth";
import getFirestoreUserData from "./GlobalFunctions/getFirestoreUserData";
import { useDispatch } from "react-redux";
import { dataActions } from "./store/dataSlice";
import setDataDocInFirestore from "./GlobalFunctions/setDataDocInFirestore";
import BackgroundService from "react-native-background-actions";
import { parkingDetectionTask } from "./BackgroundTasks/parkingDetectionTask";
import { taskOptions } from "./BackgroundTasks/TasksConfig";
import readDataFromStorage from "./GlobalFunctions/readDataFromStorage";
import writeMultiToStorage from "./GlobalFunctions/writeMultiToStorage";
import { internalUsageDataActions } from "./store/internalUsageDataSlice";

const Stack = createNativeStackNavigator();

const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const updateReduxIntervalRef = useRef(null);

    const dispatch = useDispatch();

    const initialPersistData = {
        appState: 'stable',
        userConnectingToCharger: false,
        userConnectingToBluetooth: false,
        numOfLearnedRides: 0,
        learnedRides: [],
        currentLocation: {
            latitude: 31.768319,
            longitude: 35.21371,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
        },
        currentSpeed: 0,
        isOnRide: false,
        batteryState: 'unplugged',
        bluetoothConnected: false,
        currentRide: {
            finishedRide: false,
            chargerDisconnected: false,
            bluetoothDisconnected: false,
            chargedDuringTheRide: false,
            usedBluetoothDuringTheRide: false,
            parkingChecked: false
        }
    }

    const internalUsageData = {
        wantedAppState: 'stable',
        parkedVehicleLocation: null,
        probablyParkingLocations: [],
        wrongDetectedParking: 0
    }

    // updates the redux with persist data from async storage for update the UI
    const updateDataInRedux = async () => {
        const persistData = await readDataFromStorage('data');
        const internalData = await readDataFromStorage('internalUsageData');

        if(persistData !== null) {
            dispatch(dataActions.setAppState(persistData.appState));
            dispatch(dataActions.setCurrentLocation(persistData.currentLocation));
            dispatch(dataActions.setNumOfLearnedRides(persistData.numOfLearnedRides));
            dispatch(dataActions.setCurrentSpeed(persistData.currentSpeed));
            dispatch(dataActions.setIsOnRide(persistData.isOnRide));
            dispatch(dataActions.setBatteryState(persistData.batteryState));
            dispatch(dataActions.setBluetoothConnected(persistData.bluetoothConnected));
            dispatch(dataActions.setCurrentRide(persistData.currentRide));
        }
        if(internalData !== null) {
            dispatch(internalUsageDataActions.setWantedAppState(internalData.wantedAppState));
            dispatch(internalUsageDataActions.setParkedVehicleLocation(internalData.parkedVehicleLocation));
            dispatch(internalUsageDataActions.setProbablyParkingLocations(internalData.probablyParkingLocations));
            dispatch(internalUsageDataActions.setWrongDetectedParking(internalData.wrongDetectedParking));
        }
    };

    // init the user data from database and show screens depending on whether the user is logged in or not
    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(async (user) => {

            // user logged in
            if (user) {
                const userData = await getFirestoreUserData();

                // init user data got from firestore to storage
                if (userData !== null) {

                    initialPersistData.userConnectingToCharger = userData.userConnectingToCharger;
                    initialPersistData.userConnectingToBluetooth = userData.userConnectingToBluetooth;
                    initialPersistData.appState = userData.appState;
                    initialPersistData.learnedRides = userData.learnedRides;
                    initialPersistData.numOfLearnedRides = userData.numOfLearnedRides;
                    const initialDataValue = JSON.stringify(initialPersistData);

                    internalUsageData.wantedAppState = userData.appState;
                    internalUsageData.parkedVehicleLocation = userData.parkedVehicleLocation;
                    internalUsageData.wrongDetectedParking = userData.wrongDetectedParking;
                    const internalDataValue = JSON.stringify(internalUsageData);

                    await writeMultiToStorage([['data', initialDataValue], ['internalUsageData', internalDataValue]]);
                }
                // init new user doc in database and data in storage
                else {
                    const initialUserData = {
                        appState: 'learning',
                        userConnectingToCharger: false,
                        userConnectingToBluetooth: false,
                        numOfLearnedRides: 0,
                        learnedRides: [],
                        parkedVehicleLocation: null,
                        wrongDetectedParking: 0
                    }
                    await setDataDocInFirestore(initialUserData);

                    const initialDataValue = JSON.stringify(initialPersistData);
                    const internalDataValue = JSON.stringify(internalUsageData);

                    await writeMultiToStorage([['data', initialDataValue], ['internalUsageData', internalDataValue]]);
                }
                setIsLoggedIn(true);

                const fineLocationPermissions = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
                if (fineLocationPermissions === 'denied') {
                    console.log('location permissions denied');
                    Alert.alert("שגיאה", "אפשר/י גישה למיקום המכשיר כדי שהאפליקציה תוכל לעבוד כראוי");
                    SplashScreen.hide();
                    return;
                }
                else {
                    const alwaysLocationPermissions = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION);
                    if (alwaysLocationPermissions === 'denied') {
                        console.log('location permissions denied');
                        Alert.alert("שגיאה", "אפשר/י גישה למיקום המכשיר ברקע כדי שהאפליקציה תוכל לעבוד כראוי");
                        SplashScreen.hide();
                        return;
                    }
                }

                const bleScanPermissions = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN);
                if (bleScanPermissions === 'denied') {
                    console.log('bluetooth permissions denied');
                    Alert.alert("שגיאה", "אפשר/י גישה לבלוטות' כדי שהאפליקציה תוכל לעבוד כראוי");
                    SplashScreen.hide();
                    return;
                }

                const bleConnectPermissions = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT);
                if (bleConnectPermissions === 'denied') {
                    console.log('bluetooth permissions denied');
                    Alert.alert("שגיאה", "אפשר/י גישה לבלוטות' כדי שהאפליקציה תוכל לעבוד כראוי");
                    SplashScreen.hide();
                    return;
                }

                if (!BackgroundService.isRunning()) {
                    BackgroundService.stop().then(r => {});
                    BackgroundService.start(parkingDetectionTask, taskOptions).then(r => {});
                    console.log('task start');
                }

                if(!updateReduxIntervalRef.current) {
                    updateReduxIntervalRef.current = setInterval(updateDataInRedux, 5000);
                    console.log('interval start');
                }
            }
            // user didn't logged in
            else {
                setIsLoggedIn(false);
                BackgroundService.stop().then(r => {});
                console.log('task stop');
                clearInterval(updateReduxIntervalRef.current);
                updateReduxIntervalRef.current = null;
                console.log('interval stop');
            }
            SplashScreen.hide();
        });

        return () => {
            unsubscribe();
            BackgroundService.stop().then(r => {});
            console.log('task stop');
            clearInterval(updateReduxIntervalRef.current);
            updateReduxIntervalRef.current = null;
            console.log('interval stop');
        };
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                headerTitleAlign: 'center',
                headerBackTitleVisible: false,
            }}>
                {isLoggedIn ?
                    <Stack.Screen name='מיכל ניווט' component={DrawerContainer} />
                    :
                    <Stack.Group>
                        <Stack.Screen name='התחברות' component={Login} options={{ headerShown: true }} />
                        <Stack.Screen name='הרשמה' component={Signup} options={{ headerShown: true }} />
                        <Stack.Screen name='איפוס סיסמא' component={ForgotPassword} options={{ headerShown: true }} />
                    </Stack.Group>
                }
            </Stack.Navigator>

            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={'white'}
            />
        </NavigationContainer>
    );
};

export default App;
