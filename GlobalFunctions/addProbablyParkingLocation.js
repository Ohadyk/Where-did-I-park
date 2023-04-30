import writeDataToStorage from "./writeDataToStorage";

// gets the "probably parking locations" array and location, add the location to the array
// and write the new array to async storage
const addProbablyParkingLocation = async (parkingLocations, parkingData) => {

    parkingLocations.push(parkingData);

    if (parkingLocations.length > 10) {
        parkingLocations.shift();
    }

    const internalData = {
        probablyParkingLocations: parkingLocations
    };

    await writeDataToStorage('internalUsageData', internalData, true);
};

export default addProbablyParkingLocation;
