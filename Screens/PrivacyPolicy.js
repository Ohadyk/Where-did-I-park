import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { View, StyleSheet, Dimensions, Linking, Alert } from "react-native";
import storage from '@react-native-firebase/storage';
import Pdf from 'react-native-pdf';

const PrivacyPolicy = () => {

    const fileName = 'privacy-policy.pdf';

    const [url, setUrl] = useState('');

    useFocusEffect(
        useCallback(() => {
            const getUrl = async () => {
                if (!fileName) return

                try {
                    const url = await storage().ref(`files/${fileName}`).getDownloadURL();
                    setUrl(url);
                }
                catch (error) {
                    console.log('HERE ', error);
                    Alert.alert('שגיאה', 'לא ניתן לגשת לקובץ');
                }
            }
            getUrl().then(r => {});

        }, [fileName])
    );

    return (
        <View style={styles.container}>
            <Pdf
                style={styles.pdf}
                trustAllCerts={false}
                source={{ uri: url }}
                onError={(error) => console.log(error)}
                onPressLink={(link) => Linking.openURL(link)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    pdf: {
        flex: 1,
        backgroundColor: '#fff',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },

});

export default PrivacyPolicy;
