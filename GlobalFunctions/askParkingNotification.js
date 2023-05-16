import PushNotification from "react-native-push-notification";

// This method send the user a local push notification that ask him if he parked the car
const askParkingNotification = async (data) => {

    PushNotification.localNotification({
        channelId: 'parking-channel-id',
        foreground: true,
        largeIcon: 'ic_launcher',
        vibrate: true,
        vibration: 300,
        priority: 'high',
        importance: 'high',
        visibility: 'public',

        title: 'האפליקציה זיהתה חניה',
        message: 'האם אכן חנית?',

        actions: ['חניתי', 'לא חניתי'],
        invokeApp: false,

        userInfo: {
            currentLocation: {
                latitude: data.currentLocation.latitude,
                longitude: data.currentLocation.longitude
            }
        }

    });

};

export default askParkingNotification;
