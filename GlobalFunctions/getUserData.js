import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

// Returns the user document data if exists, otherwise null
const getUserData = async () => {
    try {
        const userUid = auth().currentUser.uid;
        const userDoc = await firestore().collection('users').doc(userUid).get();

        if (userDoc.exists) {
            return userDoc.data();
        }
    }
    catch (error) {
        console.log(error);
    }

    return null;
};

export default getUserData;
