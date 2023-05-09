import askParkingNotification from "./askParkingNotification";

// Trying to detect the user's parking moment. If so saves the location
const detectParking = async (currentData) => {

    // the user may have finished the ride
    if (currentData.currentRide.finishedRide) {

        // the user tends to charge during rides
        if (currentData.userConnectingToCharger) {

            // the user disconnected the charger
            if (currentData.currentRide.chargerDisconnected) {
                console.log('charger disconnected');
                await askParkingNotification(currentData.currentLocation);
                return true;
            }
        }
        // the user tends to use bluetooth during rides
        if (currentData.userConnectingToBluetooth) {

            // the user disconnected the bluetooth
            if (currentData.currentRide.bluetoothDisconnected) {
                console.log('bluetooth disconnected');
                await askParkingNotification(currentData.currentLocation);
                return true;
            }
        }

        return true;
    }

    return false;
};

export default detectParking;
