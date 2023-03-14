import updateDataInFirestore from "./updateDataInFirestore";
import readDataFromStorage from "./readDataFromStorage";
import writeDataToStorage from "./writeDataToStorage";

const updateUserBehavior = async () => {
    try {
        const internalUsageData = await readDataFromStorage('internalUsageData');

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

        await updateDataInFirestore(userBehavior);
        await writeDataToStorage('data', userBehavior, true);
    }
    catch (error) {
        console.log(error);
    }
};

export default updateUserBehavior;
