import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from "../Screens/Home";
import CustomDrawer from "./CustomDrawer";
import Ionicons from 'react-native-vector-icons/Ionicons'
import PrivacyPolicy from "../Screens/PrivacyPolicy";

const DrawerContainer = () => {

    const Drawer = createDrawerNavigator();

    return(
        <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                swipeEnabled: false,
                gestureEnabled: false,
                headerTitleAlign: 'center',
                drawerLabelStyle: { fontSize: 16 },
            }}
        >
            <Drawer.Screen
                name={'מסך הבית'}
                component={Home}
                options={{
                    drawerIcon: () => <Ionicons name='home-outline' size={22} />
                }}
            />
            <Drawer.Screen name='מדיניות פרטיות' component={PrivacyPolicy}
               options={{
                   headerShown: true,
                   drawerIcon: ({ color, focused }) => <Ionicons name='information-circle-outline' color={focused ? color : 'black'} size={22} />
               }}
            />
        </Drawer.Navigator>
    )
};

export default DrawerContainer;
