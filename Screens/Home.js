import React, { memo, useEffect, useRef } from "react";
import HomeMap from "../Components/HomeMap";
import { AppState, View } from "react-native";
import DrawerButton from "../Buttons/DrawerButton";
import IParkedButton from "../Buttons/IParkedButton";
import { useDispatch, useSelector } from "react-redux";
import LearningStateCard from "../Components/LearningStateCard";
import StableStateCard from "../Components/StableStateCard";
import HomeHeader from "../Components/HomeHeader";
import { dataActions } from "../store/dataSlice";
import readDataFromStorage from "../GlobalFunctions/readDataFromStorage";

const Home = () => {

    const dispatch = useDispatch();

    const appState = useSelector(state => state.data.appState);

    const updateReduxRef = useRef(null);

    const headerTitle = appState === 'learning' ? 'מצב למידה' : 'מצב יציב';

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
            console.log('active');

            updateReduxRef.current = setInterval(updateReduxData, 5000);
        }
        else if (state === 'background') {
            console.log('background');

            clearInterval(updateReduxRef.current);
        }
    };

    useEffect(() => {
        const runningModeListener = AppState.addEventListener('change', handleRunningModeChange);

        updateReduxRef.current = setInterval(updateReduxData, 5000);

        return () => {
            runningModeListener.remove('change', handleRunningModeChange);
        }
    }, []);

    return(
        <View style={{flex: 1}}>
            <HomeHeader title={headerTitle}/>
            <View style={{flex: 1}}>
                <HomeMap/>
                <DrawerButton/>
                {appState === 'learning' ? <IParkedButton/> : null}
                {appState === 'learning' ? <LearningStateCard/> : null}
                {appState === 'stable' ? <StableStateCard/> : null}
            </View>
        </View>
    )
};

export default memo(Home);
