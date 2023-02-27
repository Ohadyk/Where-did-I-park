import "react-native-gesture-handler";
import { AppState, StatusBar } from "react-native";
import { useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import ForgotPassword from "./Screens/ForgotPassword";
import DrawerContainer from "./Components/DrawerContainer";
import SplashScreen from "react-native-splash-screen";
import auth from "@react-native-firebase/auth";
import getUserData from "./GlobalFunctions/getUserData";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "./store/dataSlice";
import updateUserData from "./GlobalFunctions/updateUserData";
import BackgroundService from "react-native-background-actions";
import { parkingDetectionTask } from "./BackgroundTasks/parkingDetectionTask";
import { taskOptions } from "./BackgroundTasks/TasksConfig";
import readDataFromStorage from "./GlobalFunctions/readDataFromStorage";

const Stack = createNativeStackNavigator();

const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const updateReduxIntervalRef = useRef(null);

    const appState = useSelector(state => state.data.appState);
    const userConnectingToCharger = useSelector(state => state.data.userConnectingToCharger);
    const userConnectingToBluetooth = useSelector(state => state.data.userConnectingToBluetooth);

    const dispatch = useDispatch();

    const updateReduxData = async () => {
        const persistData = await readDataFromStorage();

        if(persistData !== null) {
            dispatch(dataActions.setCurrentLocation(persistData.currentLocation));
            dispatch(dataActions.setCurrentSpeed(persistData.currentSpeed));
            dispatch(dataActions.setIsOnRide(persistData.isOnRide));
        }
    };

    // handle changes in running mode of the app:
    // create interval that updates the redux data with the data from async storage (parking detection task)
    const handleRunningModeChange = async (state) => {
        if (state === 'active') {
            updateReduxIntervalRef.current = setInterval(updateReduxData, 5000);
            console.log('interval start');
        }
        else if (state === 'background') {
            clearInterval(updateReduxIntervalRef.current);
            console.log('interval stop');
        }
    };

    // activates and stops the parking detection algorithm according to the state of the application
    useEffect(() => {
        // run the algorithm to detect parking
        if(appState === 'stable') {
            BackgroundService.start(parkingDetectionTask, taskOptions).then(r => {});
            console.log('parking detection start');
        }
        // learn user behavior - update user data depends on parking alerts from user
        else {
            BackgroundService.stop().then(r => {});
            console.log('parking detection stop');
        }

        return () => {
            BackgroundService.stop().then(r => {});
            console.log('parking detection stop');
        }
    }, [appState]);

    // init the user data from database and show screens depending on whether the user is logged in or not
    useEffect(() => {
        const runningModeListener = AppState.addEventListener('change', handleRunningModeChange);

        const unsubscribe = auth().onAuthStateChanged(async (user) => {

            // user logged in
            if (user) {
                const userData = await getUserData();

                // init user data in redux
                if (userData !== null) {
                    dispatch(dataActions.setAppState(userData.appState));
                    dispatch(dataActions.setUserConnectingToCharger(userData.userConnectingToCharger));
                    dispatch(dataActions.setUserConnectingToBluetooth(userData.userConnectingToBluetooth));
                }
                // init new user doc in database
                else {
                    const initialUserData = {
                        appState,
                        userConnectingToCharger,
                        userConnectingToBluetooth
                    }
                    await updateUserData(initialUserData);
                }
                setIsLoggedIn(true);
            }
            // user didn't logged in
            else {
                setIsLoggedIn(false);
            }
            SplashScreen.hide();
        });

        return () => {
            unsubscribe();
            runningModeListener.remove('change', handleRunningModeChange);
            clearInterval(updateReduxIntervalRef.current);
        };
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false,
                gestureEnabled: false,
                headerTitleAlign: "center",
                headerBackTitleVisible: false,
            }}>
                {isLoggedIn ?
                    <Stack.Screen name="מיכל ניווט" component={DrawerContainer} />
                    :
                    <Stack.Group>
                        <Stack.Screen name="התחברות" component={Login} options={{ headerShown: true }} />
                        <Stack.Screen name="הרשמה" component={Signup} options={{ headerShown: true }} />
                        <Stack.Screen name="איפוס סיסמא" component={ForgotPassword} options={{ headerShown: true }} />
                    </Stack.Group>
                }
            </Stack.Navigator>

            <StatusBar
                barStyle={"dark-content"}
                backgroundColor={"white"}
            />
        </NavigationContainer>
    );
};

export default App;
