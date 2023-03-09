import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

// Creates or updates the user document data in firestore
const setDataDocInFirestore = async (userData) => {

    try {
        const userUid = auth().currentUser.uid;
        await firestore().collection('users').doc(userUid).set(userData, { merge: true });
    }
    catch (error) {
        console.log(error);
    }
};

export default setDataDocInFirestore;
