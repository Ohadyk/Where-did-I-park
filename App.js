import "react-native-gesture-handler";
import { StatusBar } from "react-native";
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
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "./store/dataSlice";
import updateDataInFirestore from "./GlobalFunctions/updateDataInFirestore";
import BackgroundService from "react-native-background-actions";
import { parkingDetectionTask } from "./BackgroundTasks/parkingDetectionTask";
import { taskOptions } from "./BackgroundTasks/TasksConfig";
import readDataFromStorage from "./GlobalFunctions/readDataFromStorage";
import writeDataToStorage from "./GlobalFunctions/writeDataToStorage";

const Stack = createNativeStackNavigator();

const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const updateReduxIntervalRef = useRef(null);

    const appState = useSelector(state => state.data.appState);
    const userConnectingToCharger = useSelector(state => state.data.userConnectingToCharger);
    const userConnectingToBluetooth = useSelector(state => state.data.userConnectingToBluetooth);
    const numOfLearnedRides = useSelector(state => state.data.numOfLearnedRides);

    const dispatch = useDispatch();

    const initialPersistData = {
        appState: 'learning',
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

    const updateReduxData = async () => {
        const persistData = await readDataFromStorage();

        if(persistData !== null) {
            dispatch(dataActions.setCurrentLocation(persistData.currentLocation));
            dispatch(dataActions.setCurrentSpeed(persistData.currentSpeed));
            dispatch(dataActions.setIsOnRide(persistData.isOnRide));
            dispatch(dataActions.setBatteryState(persistData.batteryState));
        }
    };

    // init the user data from database and show screens depending on whether the user is logged in or not
    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(async (user) => {

            // user logged in
            if (user) {
                const userData = await getFirestoreUserData();

                // init user data in redux and in async storage
                if (userData !== null) {
                    dispatch(dataActions.setAppState(userData.appState));
                    dispatch(dataActions.setUserConnectingToCharger(userData.userConnectingToCharger));
                    dispatch(dataActions.setUserConnectingToBluetooth(userData.userConnectingToBluetooth));
                    dispatch(dataActions.setNumOfLearnedRides(userData.numOfLearnedRides));

                    initialPersistData.appState = userData.appState;
                    await writeDataToStorage(initialPersistData);
                }
                // init new user doc in database and data in async storage
                else {
                    const initialUserData = {
                        appState,
                        userConnectingToCharger,
                        userConnectingToBluetooth,
                        numOfLearnedRides
                    }
                    await updateDataInFirestore(initialUserData);
                    await writeDataToStorage(initialPersistData);
                }
                setIsLoggedIn(true);
                BackgroundService.start(parkingDetectionTask, taskOptions).then(r => {});
                console.log('task start');

                if(!updateReduxIntervalRef.current) {
                    updateReduxIntervalRef.current = setInterval(updateReduxData, 5000);
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
