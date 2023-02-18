import React from "react";
import HomeMap from "../Components/HomeMap";
import { View } from "react-native";
import DrawerButton from "../Buttons/DrawerButton";
import IParkedButton from "../Buttons/IParkedButton";
import { useSelector } from "react-redux";

const Home = () => {

    const appState = useSelector(state => state.data.userData.appState);

    return(
        <View>
            <HomeMap/>
            <DrawerButton/>
            {appState === 'learning' ? <IParkedButton /> : null}
        </View>
    )
};

export default Home;
