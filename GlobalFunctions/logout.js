import auth from '@react-native-firebase/auth';
import { Alert } from "react-native";

// This method log out the user
export const logout = async () => {
    try {
        await auth().signOut();
    }
    catch (error) {
        console.log(error);
        Alert.alert("שגיאה", "אנא נסה שוב");
    }
};
