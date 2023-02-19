import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

// Updates the user document data in the database
const updateUserData = async (userData) => {

    try {
        const userUid = auth().currentUser.uid;
        await firestore().collection('users').doc(userUid).set(userData, { merge: true });
    }
    catch (error) {
        console.log(error);
    }
};

export default updateUserData;
