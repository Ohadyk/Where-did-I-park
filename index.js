/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Provider } from "react-redux";
import store from "./store";
import PushNotification, { Importance } from "react-native-push-notification";
import writeDataToStorage from "./GlobalFunctions/writeDataToStorage";
import updateDataInFirestore from "./GlobalFunctions/updateDataInFirestore";
import readDataFromStorage from "./GlobalFunctions/readDataFromStorage";
import firestore from "@react-native-firebase/firestore";

PushNotification.createChannel(
    {
        channelId: "parking-channel-id",
        channelName: "Parking channel",
        importance: Importance.HIGH,
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

PushNotification.configure({

    // (required) Called when a remote or local notification is opened or received
    onNotification: function (notification) {
        console.log('NOTIFICATION: ', notification.userInteraction);
    },

    // (optional) Called when the user taps on a notification in the foreground
    onNotificationOpened: function (notification) {
        console.log('NOTIFICATION OPENED');
    },

    // (optional) Called when the user interact with the notification by the notification actions
    onAction: async function (action) {

        const userInfoObject = JSON.parse(action.userInfo);
        const userLocation = userInfoObject.currentLocation;

        // the user parked his car
        if(action.action === 'חניתי') {
            const userData = {
                parkedVehicleLocation: userLocation
            };
            const parkedLocation = {
                probablyParkingLocations: [],
                parkedVehicleLocation: userLocation
            };

            await updateDataInFirestore(userData);
            await writeDataToStorage('internalUsageData', parkedLocation, true);
        }
        // the user did not park his car
        else if(action.action === 'לא חניתי') {
            const internalUsageData = await readDataFromStorage('internalUsageData');

            // switch to learning state to update user behavior
            if(internalUsageData.wrongDetectedParking + 1 >= 5) {
                const wrongDetectedParking = {
                    wantedAppState: 'learning'
                };
                await writeDataToStorage('internalUsageData', wrongDetectedParking, true);
            }
            // stay in stable state
            else {
                const wrongDetectedParking = {
                    wrongDetectedParking: internalUsageData.wrongDetectedParking + 1
                };
                await writeDataToStorage('internalUsageData', wrongDetectedParking, true);
            }

            const userData = {
                wrongDetectedParking: firestore.FieldValue.increment(1)
            };
            await updateDataInFirestore(userData);
        }

    }

});

const AppRedux = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => AppRedux);
