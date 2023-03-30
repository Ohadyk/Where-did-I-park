import writeDataToStorage from "./writeDataToStorage";

const addProbablyParkingLocation = async (parkingLocations, parkingData) => {

    parkingLocations.push(parkingData);

    if (parkingLocations.length > 5) {
        parkingLocations.shift();
    }

    const internalData = {
        probablyParkingLocations: parkingLocations
    };

    await writeDataToStorage('internalUsageData', internalData, true);
};

export default addProbablyParkingLocation;
