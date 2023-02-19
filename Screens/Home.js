import React, { memo } from "react";
import HomeMap from "../Components/HomeMap";
import { View } from "react-native";
import DrawerButton from "../Buttons/DrawerButton";
import IParkedButton from "../Buttons/IParkedButton";
import { useSelector } from "react-redux";
import LearningStateHeader from "../Components/LearningStateHeader";
import StableStateHeader from "../Components/StableStateHeader";

const Home = () => {

    const appState = useSelector(state => state.data.userData.appState);

    return(
        <View>
            <HomeMap/>
            <DrawerButton/>
            {appState === 'learning' ? <IParkedButton /> : null}
            {appState === 'learning' ? <LearningStateHeader /> : null}
            {appState === 'stable' ? <StableStateHeader /> : null}
        </View>
    )
};

export default memo(Home);
