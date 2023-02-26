import AsyncStorage from "@react-native-async-storage/async-storage";

const readDataFromStorage = async () => {
    try {
        const jsonData = await AsyncStorage.getItem('data');
        return jsonData !== null ? JSON.parse(jsonData) : null
    }
    catch (error) {
        console.log(error)
    }
};

export default readDataFromStorage;
