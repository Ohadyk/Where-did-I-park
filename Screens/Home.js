import React from "react";
import HomeMap from "../Components/HomeMap";
import { View } from "react-native";
import DrawerButton from "../Buttons/DrawerButton";

const Home = () => {

    return(
        <View>
            <HomeMap/>
            <DrawerButton/>
        </View>
    )
};

export default Home;
