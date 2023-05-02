import updateDataInFirestore from "./updateDataInFirestore";
import writeDataToStorage from "./writeDataToStorage";

// Updates the user's usage behavior while on rides
const updateUserBehavior = async (internalUsageData) => {
    try {
        const userBehavior = {
            userConnectingToCharger: false,
            userConnectingToBluetooth: false
        };

        let numOfChargedRides = 0;
        let numOfBluetoothRides = 0;

        internalUsageData.updatedLearnedRides.forEach(ride => {
            if(ride.chargedDuringTheRide) {
                numOfChargedRides++;
            }
            if(ride.usedBluetoothDuringTheRide) {
                numOfBluetoothRides++;
            }
        });

        if(numOfChargedRides > 2) {
            userBehavior.userConnectingToCharger = true;
        }
        if(numOfBluetoothRides > 2) {
            userBehavior.userConnectingToBluetooth = true;
        }

        // await updateDataInFirestore(userBehavior);
        await writeDataToStorage('data', userBehavior, true);

        return userBehavior;
    }
    catch (error) {
        console.log(error);
    }
};

export default updateUserBehavior;
