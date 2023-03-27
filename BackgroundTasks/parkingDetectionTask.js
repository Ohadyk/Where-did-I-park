import BackgroundService from "react-native-background-actions";
import { Alert, PermissionsAndroid } from "react-native";
import updateDataInStorage from "../GlobalFunctions/updateDataInStorage";

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

export const parkingDetectionTask = async (taskDataArguments) => {
    const { delay } = taskDataArguments;

    await new Promise( async (resolve) => {

        const userPermissions = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

        if(userPermissions === 'denied') {
            console.log('location permissions denied');
            Alert.alert("שגיאה", "אפשר/י גישה למיקום המכשיר כדי שהאפליקציה תוכל לעבוד");
            BackgroundService.stop().then(r => {});
        }

        for(let i = 0; BackgroundService.isRunning(); i++) {
            const updatedData = await updateDataInStorage();

            console.log('updatedData.appState = ', updatedData.appState);
            if(updatedData.appState === 'stable') {

                // ==========---------->>>    CONTINUE FROM HERE    <<<----------==========

            }

            await sleep(delay);
        }

    });
};
