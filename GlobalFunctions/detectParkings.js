import askParkingNotification from "./askParkingNotification";

// Trying to detect the user's parking moment. If so saves the location and return the result.
// Result:  0 - false
//          1 - true
//         -1 - unknown
const detectParking = async (currentData) => {

    // the user may have finished the ride
    if (currentData.currentRide.finishedRide) {

        // the user tends to charge during rides
        if (currentData.userConnectingToCharger) {

            // the user charged during the ride
            if (currentData.currentRide.chargedDuringTheRide) {

                // the user disconnected the charger
                if (currentData.currentRide.chargerDisconnected) {
                    console.log('charger disconnected');
                    await askParkingNotification(currentData);
                    return 1;
                }
                else {
                    return -1;
                }
            }
            // the user did not charge during the ride
            else {
                return 1;
            }
        }
        // the user tends to use bluetooth during rides
        if (currentData.userConnectingToBluetooth) {

            // the user used bluetooth during the ride
            if (currentData.currentRide.usedBluetoothDuringTheRide) {

                // the user disconnected the bluetooth
                if (currentData.currentRide.bluetoothDisconnected) {
                    console.log('bluetooth disconnected');
                    await askParkingNotification(currentData);
                    return 1;
                }
                else {
                    return -1;
                }
            }
            // the user did not use bluetooth during the ride
            else {
                return 1;
            }
        }

        return 1;
    }

    return 0;
};

export default detectParking;
