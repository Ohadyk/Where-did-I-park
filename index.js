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
            const parkedLocation = {
                parkedVehicleLocation: userLocation
            };

            await updateDataInFirestore(parkedLocation);
            await writeDataToStorage('internalUsageData', parkedLocation, true);
        }
        // the user did not park his car
        else if(action.action === 'לא חניתי') {
            // console.log('userInfo = ', action.userInfo)


        }

    }

});

const AppRedux = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => AppRedux);
