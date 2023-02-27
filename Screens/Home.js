import React, { memo } from "react";
import HomeMap from "../Components/HomeMap";
import { View } from "react-native";
import DrawerButton from "../Buttons/DrawerButton";
import IParkedButton from "../Buttons/IParkedButton";
import { useSelector } from "react-redux";
import LearningStateCard from "../Components/LearningStateCard";
import StableStateCard from "../Components/StableStateCard";
import HomeHeader from "../Components/HomeHeader";

const Home = () => {

    const appState = useSelector(state => state.data.appState);

    const headerTitle = appState === "learning" ? "מצב למידה" : "מצב יציב";

    return (
        <View style={{ flex: 1 }}>
            <HomeHeader title={headerTitle} />
            <View style={{ flex: 1 }}>
                <HomeMap />
                <DrawerButton />
                {appState === "learning" ?
                    <>
                        <IParkedButton />
                        <LearningStateCard />
                    </>
                    :
                    null
                }
                {appState === "stable" ? <StableStateCard /> : null}
            </View>
        </View>
    );
};

export default memo(Home);
