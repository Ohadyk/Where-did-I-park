import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import GlobalStyle from "../StyleSheet/GlobalStyle";
import Entypo from "react-native-vector-icons/Entypo";
import PrimaryButton from "../Components/PrimaryButton";
import { LINEAR_GRADIENT_BLUE } from "../StyleSheet/GlobalColors";


const ForgotPassword = () => {

    const passwordReset = () => {
        console.log('password reset')
    }

    return(
        <View style={GlobalStyle.screenContainer}>
            <View style={GlobalStyle.formContainer}>
                <View style={{width: '100%', marginBottom: 30}}>
                    <Text style={styles.txt}>אנא הכנס/י את האימייל שבאמצעותו נרשמת על מנת שנשלח לך קישור לאיפוס הסיסמא:</Text>
                </View>
                <View style={[GlobalStyle.inputContainer, {marginVertical: 20}, GlobalStyle.shadow]}>
                    <TextInput
                        style={GlobalStyle.input}
                        placeholder={'אימייל'}
                    />
                    <Entypo style={GlobalStyle.inputIcon} name='mail' size={25} />
                </View>
                <View style={GlobalStyle.row}>
                    <PrimaryButton
                        text={'שלח קישור לאיפוס'}
                        width={'95%'}
                        colors={LINEAR_GRADIENT_BLUE}
                        onClick={passwordReset}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    txt: {
        fontSize: 17,
        fontWeight: 'bold',
    },
});

export default ForgotPassword;
