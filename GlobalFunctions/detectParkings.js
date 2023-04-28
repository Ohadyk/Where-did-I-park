import askParkingNotification from "./askParkingNotification";

// Trying to detect the user's parking moment. If so saves the location
const detectParking = async (currentData) => {

    // console.log('finishedRide = ', currentData.currentRide.finishedRide);

    // the user may have finished the ride
    if (currentData.currentRide.finishedRide) {

        // the user tends to charge during rides
        if (currentData.userConnectingToCharger) {

            // the user disconnected the charger
            if (currentData.currentRide.chargerDisconnected) {
                console.log('charger disconnected');
                return true;
            }
        }
        // the user tends to use bluetooth during rides
        if (currentData.userConnectingToBluetooth) {

            // the user disconnected the bluetooth
            if (currentData.currentRide.bluetoothDisconnected) {
                console.log('bluetooth disconnected');
                return true;
            }
        }

        return true;
    }

    await askParkingNotification(currentData.currentLocation);
    return false;
};

export default detectParking;