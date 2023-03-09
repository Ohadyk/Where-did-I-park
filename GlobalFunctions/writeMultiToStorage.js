import AsyncStorage from "@react-native-async-storage/async-storage";

// Gets key, data to write to async storage and if to merge the data or not, and perform the query
const writeMultiToStorage = async (listOfPairs) => {
    try {
        await AsyncStorage.multiSet(listOfPairs);
    }
    catch (error) {
        console.log(error);
    }
};

export default writeMultiToStorage;
