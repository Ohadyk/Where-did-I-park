import "react-native-gesture-handler";
import { StatusBar } from "react-native";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import ForgotPassword from "./Screens/ForgotPassword";
import SplashScreen from "react-native-splash-screen";

const Stack = createNativeStackNavigator();

const App = () => {

    useEffect(() => {
        SplashScreen.hide();
    }, [])

    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                gestureEnabled: false,
                headerTitleAlign: 'center',
                headerBackTitleVisible: false,
            }}>
                <Stack.Screen
                    name='התחברות'
                    component={Login}
                />
                <Stack.Screen
                    name='הרשמה'
                    component={Signup}
                />
                <Stack.Screen
                    name='איפוס סיסמא'
                    component={ForgotPassword}
                />
            </Stack.Navigator>

            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={'white'}
            />
        </NavigationContainer>
    )
}

export default App;
