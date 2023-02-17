import "react-native-gesture-handler";
import { Provider } from "react-redux";
import store from "./store/index";
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

const Stack = createNativeStackNavigator();

const App = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((user) => {
            if(user) {
                console.log('logged in');
                setIsLoggedIn(true)
            }
            else {
                console.log('not logged in');
                setIsLoggedIn(false)
            }
        });

        SplashScreen.hide();

        return () => {unsubscribe()}
    }, [])

    return(
        <Provider store={store}>
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
                            <Stack.Screen name='התחברות' component={Login}  options={{headerShown: true}} />
                            <Stack.Screen name='הרשמה' component={Signup} options={{headerShown: true}} />
                            <Stack.Screen name='איפוס סיסמא' component={ForgotPassword} options={{headerShown: true}} />
                        </Stack.Group>
                    }
                </Stack.Navigator>

                <StatusBar
                    barStyle={'dark-content'}
                    backgroundColor={'white'}
                />
            </NavigationContainer>
        </Provider>
    )
}

export default App;
