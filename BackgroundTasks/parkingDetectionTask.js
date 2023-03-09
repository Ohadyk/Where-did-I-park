import BackgroundService from "react-native-background-actions";
import { PermissionsAndroid } from "react-native";
import updateDataInStorage from "../GlobalFunctions/updateDataInStorage";

const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

export const parkingDetectionTask = async (taskDataArguments) => {
    const { delay } = taskDataArguments;

    await new Promise( async (resolve) => {

        const userPermissions = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

        if(userPermissions === 'denied') {
            console.log('location permissions denied');
            BackgroundService.stop().then(r => {});
        }

        for(let i = 0; BackgroundService.isRunning(); i++) {
            const updatedData = await updateDataInStorage();

            if(updatedData.appState === 'stable') {

            }

            await sleep(delay);
        }

    });
};
