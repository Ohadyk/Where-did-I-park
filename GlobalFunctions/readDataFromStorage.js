import AsyncStorage from "@react-native-async-storage/async-storage";

// Gets a key and return the data stored in async storage with that key
const readDataFromStorage = async (key) => {
    try {
        const jsonData = await AsyncStorage.getItem(key);
        return jsonData !== null ? JSON.parse(jsonData) : null
    }
    catch (error) {
        console.log(error);
    }
};

export default readDataFromStorage;
