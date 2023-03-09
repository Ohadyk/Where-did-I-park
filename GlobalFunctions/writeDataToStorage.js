import AsyncStorage from "@react-native-async-storage/async-storage";

// Gets key, data to write to async storage and if to merge the data or not, and perform the query
const writeDataToStorage = async (key, data, merge) => {
    try {
        const dataValue = JSON.stringify(data);

        if(merge) {
            await AsyncStorage.mergeItem(key, dataValue);
        }
        else {
            await AsyncStorage.setItem(key, dataValue);
        }
    }
    catch (error) {
        console.log(error);
    }
};

export default writeDataToStorage;
