import auth from '@react-native-firebase/auth';

// This method log out the user
export const logout = async () => {
    try {
        await auth().signOut();
    }
    catch (error) {
        console.log(error);
    }
};
