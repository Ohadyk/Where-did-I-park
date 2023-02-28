import AsyncStorage from "@react-native-async-storage/async-storage";

const writeDataToStorage = async (data) => {
    try {
        const dataValue = JSON.stringify(data);
        await AsyncStorage.setItem('data', dataValue);
    }
    catch (error) {
        console.log(error)
    }
};

export default writeDataToStorage;
