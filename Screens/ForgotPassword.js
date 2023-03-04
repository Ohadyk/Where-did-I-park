import React, { useRef, useState } from "react";
import { Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import GlobalStyle from "../StyleSheet/GlobalStyle";
import Entypo from "react-native-vector-icons/Entypo";
import PrimaryButton from "../Buttons/PrimaryButton";
import { LINEAR_GRADIENT_BLUE } from "../StyleSheet/GlobalColors";
import auth from '@react-native-firebase/auth';
import GlobalStyles from "../StyleSheet/GlobalStyle";

const ForgotPassword = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [emailValidError, setEmailValidError] = useState('');
    const [serverError, setServerError] = useState(false);

    const emailRef = useRef(null)

    // validate the user input when click on reset password button
    const onResetPassword = async () => {
        const emailValidationRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        setEmailValidError('')
        setServerError(false)

        if (!email) {
            setEmailValidError('אנא הכנס/י כתובת אימייל')
            emailRef.current.focus()
        }
        else if(!emailValidationRegex.test(email)) {
            setEmailValidError('אימייל לא חוקי')
            emailRef.current.focus()
        }
        else {
            await resetPasswordHandler()
        }
    }

    // reset the user password if the inputs are valid
    const resetPasswordHandler = async () => {
        try {
            await auth().sendPasswordResetEmail(email);
            navigation.navigate('התחברות')
            alert('נשלח אליך אימייל לאיפוס הסיסמא')
        }
        catch (error) {
            console.log(error)
            setServerError(true)
        }
    }

    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={GlobalStyle.screenContainer}>
                    <View style={GlobalStyle.formContainer}>
                        <View style={{width: '100%', marginBottom: 30}}>
                            <Text style={styles.txt}>אנא הכנס/י את האימייל שבאמצעותו נרשמת על מנת שנשלח אליך קישור לאיפוס הסיסמא:</Text>
                        </View>
                        <View style={{ width: '100%', marginBottom: 20 }}>
                            <View style={[GlobalStyle.inputContainer, {marginVertical: 20}, GlobalStyle.shadow]}>
                                <TextInput
                                    style={GlobalStyle.input}
                                    placeholder={'אימייל'}
                                    value={email}
                                    ref={emailRef}
                                    onChangeText={(value) => {
                                        setEmail(value);
                                    }}
                                />
                                <Entypo style={GlobalStyle.inputIcon} name='mail' size={25} />
                            </View>
                            {emailValidError ? <Text style={GlobalStyle.inputErrorTxt}>{emailValidError}</Text> : null}
                        </View>
                        {serverError ? <Text style={GlobalStyles.inputErrorTxt}>שגיאה. אנא נסה שוב מאוחר יותר</Text> : null}
                        <View style={GlobalStyle.row}>
                            <PrimaryButton
                                text={'שלח קישור לאיפוס'}
                                width={'95%'}
                                colors={LINEAR_GRADIENT_BLUE}
                                onClick={onResetPassword}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    txt: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ForgotPassword;
