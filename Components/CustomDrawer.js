import React from "react";
import { View } from "react-native";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { logout } from "../GlobalFunctions/logout";

const CustomDrawer = (props) => {

    return(
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={{ flex: 1, paddingTop: 10, margin: 5 }}>
                    <DrawerItemList {...props} />
                    <DrawerItem
                        labelStyle={{fontSize: 16, color: 'red'}}
                        label={'יציאה'}
                        icon={() => <Ionicons name='log-out-outline' size={25} />}
                        onPress={async () => {
                            await logout();
                            props.navigation.closeDrawer();
                        }}
                    />
                </View>
            </DrawerContentScrollView>
        </View>
    )
};

export default CustomDrawer;
