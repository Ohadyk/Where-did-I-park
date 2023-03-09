import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

// Gets updated user doc data and updates the document in firestore
const updateDataInFirestore = async (docData) => {

    try {
        const userUid = auth().currentUser.uid;
        await firestore().collection('users').doc(userUid).update(docData);
    }
    catch (error) {
        console.log(error);
    }
};

export default updateDataInFirestore;
