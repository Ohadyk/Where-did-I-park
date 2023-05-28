import React from "react";
import { Alert, Dimensions, StyleSheet, Text, View } from "react-native";
import GlobalStyle from "../StyleSheet/GlobalStyle";
import Animated, { BounceIn, BounceOut } from "react-native-reanimated";
import Lottie from "lottie-react-native";
import { LINEAR_GRADIENT_GREEN, LINEAR_GRADIENT_GREY } from "../StyleSheet/GlobalColors";
import PrimaryButton from "../Buttons/PrimaryButton";
import requestPermissions from "../GlobalFunctions/requestPermissions";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/uiSlice";
import BackgroundService from "react-native-background-actions";
import { parkingDetectionTask } from "../BackgroundTasks/parkingDetectionTask";
import { taskOptions } from "../BackgroundTasks/TasksConfig";

const { width, height } = Dimensions.get("screen");

const PermissionsModal = () => {

    const dispatch = useDispatch();

    const onAllowPermissions = async () => {
        const allowed = await requestPermissions();
        console.log('allowed = ', allowed);

        // start the background task to follow user location
        if (allowed) {
            if (!BackgroundService.isRunning()) {
                BackgroundService.stop().then(r => {
                    BackgroundService.start(parkingDetectionTask, taskOptions).then(r => {});
                    console.log('task start from modal');
                });
                // BackgroundService.start(parkingDetectionTask, taskOptions).then(r => {});
                // console.log('task start from modal');
            }
        }
        dispatch(uiActions.setShowPermissionsModal(false));
    }

    const cancelPermissions = () => {
        Alert.alert("שגיאה", "אפשר/י גישה למיקום המכשיר כדי שהאפליקציה תוכל לעבוד כראוי");
        dispatch(uiActions.setShowPermissionsModal(false));
    }

    return(
        <Animated.View
            style={[styles.container, GlobalStyle.shadow]}
            entering={BounceIn.duration(700).delay(500)}
            exiting={BounceOut.duration(500).delay(0)}
        >
            <Text style={styles.headerTxt}>שימוש במיקום</Text>
            <View style={styles.iconSize}>
                <Lottie
                    source={require('../assets/lottiefiles/77856-select-your-location.json')}
                    autoPlay
                    loop={false}
                    style={{ width: '100%', height: '100%', alignSelf: 'center' }}
                />
            </View>
            <Text style={styles.bodyTxt}>אפליקציה זו אוספת נתוני מיקום כדי לאפשר את זיהוי החניות, גם כאשר האפליקציה סגורה או לא בשימוש.</Text>
            <View style={styles.buttonsContainer}>
                <PrimaryButton
                    text={'אפשר'}
                    width={'30%'}
                    colors={LINEAR_GRADIENT_GREEN}
                    onClick={onAllowPermissions}
                />
                <PrimaryButton
                    text={'דחה'}
                    width={'30%'}
                    colors={LINEAR_GRADIENT_GREY}
                    onClick={cancelPermissions}
                />
            </View>
        </Animated.View>
    )
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        alignSelf: 'center',
        alignItems: 'center',
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        top: height / 5
    },

    headerTxt: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },

    bodyTxt: {
        textAlign: 'center',
        fontSize: 16,
        margin: 10
    },

    iconSize: {
        margin: 20,
        width: width / 7,
        height: height / 7,
    },

    buttonsContainer: {
        width: '100%',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-evenly'
    }

});

export default PermissionsModal;
