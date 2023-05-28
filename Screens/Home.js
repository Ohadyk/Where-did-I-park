import React, { memo, useEffect } from "react";
import HomeMap from "../Components/HomeMap";
import { PermissionsAndroid, View } from "react-native";
import DrawerButton from "../Buttons/DrawerButton";
import IParkedButton from "../Buttons/IParkedButton";
import { useDispatch, useSelector } from "react-redux";
import LearningStateCard from "../Components/LearningStateCard";
import StableStateCard from "../Components/StableStateCard";
import HomeHeader from "../Components/HomeHeader";
import PermissionsModal from "../Components/PermissionsModal";
import { uiActions } from "../store/uiSlice";
import BackgroundService from "react-native-background-actions";
import { parkingDetectionTask } from "../BackgroundTasks/parkingDetectionTask";
import { taskOptions } from "../BackgroundTasks/TasksConfig";

const Home = () => {

    const dispatch = useDispatch();

    const appState = useSelector(state => state.data.appState);
    const showPermissionsModal = useSelector(state => state.ui.showPermissionsModal);

    const headerTitle = appState === "learning" ? "מצב למידה" : "מצב יציב";

    useEffect(() => {
        async function checkPermissions() {
            const locationAllowed = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            const backgroundAllowed = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION);
            console.log('locationAllowed = ', locationAllowed);
            console.log('backgroundAllowed = ', backgroundAllowed);

            if (!backgroundAllowed || !locationAllowed) {
                console.log('show modal');
                dispatch(uiActions.setShowPermissionsModal(true));
            }
            else {
                if (!BackgroundService.isRunning()) {
                    BackgroundService.stop().then(r => {
                        BackgroundService.start(parkingDetectionTask, taskOptions).then(r => {});
                        console.log('task start from home');
                    });
                    // BackgroundService.start(parkingDetectionTask, taskOptions).then(r => {});
                    // console.log('task start from home');
                }
            }
        }

        checkPermissions().then(r => {});

    }, [])

    return (
        <View style={{ flex: 1 }}>
            <HomeHeader title={headerTitle} />
            <View style={{ flex: 1 }}>
                <HomeMap />
                {showPermissionsModal && <PermissionsModal />}
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
