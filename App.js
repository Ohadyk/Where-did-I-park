import "react-native-gesture-handler";
import { StatusBar } from "react-native";
import { useEffect, useState } from "react";
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

const Stack = createNativeStackNavigator();

const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const dispatch = useDispatch();
    const initialUserData = useSelector(state => state.data.userData);

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(async (user) => {
            if (user) {
                const userData = await getUserData();
                if (userData !== null) {
                    dispatch(dataActions.setUserData(userData));    // init user data in redux

                    if(userData.appState === 'stable') {    // run the algorithm to detect parkings

                    }
                }
                else {  // init new user doc
                    await updateUserData(initialUserData);
                }

                setIsLoggedIn(true);
            }
            else {
                setIsLoggedIn(false);
            }
        });

        SplashScreen.hide();

        return () => {
            unsubscribe();
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
