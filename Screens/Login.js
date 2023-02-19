import React, { useState, useRef } from "react";
import { StyleSheet, TextInput, TouchableWithoutFeedback, View, Keyboard, ScrollView } from "react-native";
import Animated, { BounceInUp, ZoomInDown } from "react-native-reanimated";
import PrimaryButton from "../Components/PrimaryButton";
import appIcon from '../assets/icon.png';
import GlobalStyles from '../StyleSheet/GlobalStyle';
import Entypo from "react-native-vector-icons/Entypo";
import { LINEAR_GRADIENT_BLUE, LINEAR_GRADIENT_GREY } from "../StyleSheet/GlobalColors";
import auth from '@react-native-firebase/auth';
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";

const Login = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const dispatch = useDispatch()

    // navigate the user to sign up screen
    const signup = () => {
        navigation.navigate('הרשמה')
    }

    // navigate the user to forgot password screen
    const forgotPassword = () => {
        navigation.navigate('איפוס סיסמא')
    }

    // validate the user inputs when click on login button
    const onLogin = async () => {
        const emailValidationRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (!email) {
            emailRef.current.focus()
            alert('אנא מלא/י את כל הפרטים')
        }
        else if(!emailValidationRegex.test(email)) {
            emailRef.current.focus()
            alert('אימייל לא חוקי')
        }
        else if(!password) {
            passwordRef.current.focus()
            alert('אנא מלא/י את כל הפרטים')
        }
        else if(password.length < 6) {
            passwordRef.current.focus()
            alert('סיסמא לא חוקית')
        }
        else {
            await loginHandler()
        }
    };

    // logging the user if the inputs are valid
    const loginHandler = async () => {
        try {
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            dispatch(authActions.setUid(userCredential.user.uid));
            setEmail('')
            setPassword('')
        }
        catch (error) {
            console.log(error);

            if (error.code === 'auth/invalid-email') {
                emailRef.current.focus()
                alert('אימייל לא חוקי')
            }
            else if (error.code === 'auth/invalid-password') {
                passwordRef.current.focus()
                alert('סיסמא לא חוקית')
            }
            else {
                alert('שגיאה. אנא נסה/י שוב מאוחר יותר')
            }
        }
    };

    return(
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={GlobalStyles.screenContainer}>
                    <Animated.Image
                        source={appIcon}
                        style={GlobalStyles.appIcon}
                        entering={BounceInUp.duration(700).delay(500)}
                    />
                    <Animated.View
                        style={styles.formContainer}
                        entering={ZoomInDown.duration(500)}
                    >
                        <View style={[GlobalStyles.inputContainer, {marginVertical: 20}, GlobalStyles.shadow]}>
                            <TextInput
                                style={GlobalStyles.input}
                                placeholder={'אימייל'}
                                value={email}
                                ref={emailRef}
                                onChangeText={(value) => {
                                    setEmail(value)
                                }}
                            />
                            <Entypo style={GlobalStyles.inputIcon} name="mail" size={25}/>
                        </View>
                        <View style={[GlobalStyles.inputContainer, {marginBottom: 20}, GlobalStyles.shadow]}>
                            <TextInput
                                style={GlobalStyles.input}
                                placeholder={'סיסמא'}
                                secureTextEntry={true}
                                value={password}
                                ref={passwordRef}
                                maxLength={12}
                                onChangeText={(value) => {
                                    setPassword(value)
                                }}
                            />
                            <Entypo style={GlobalStyles.inputIcon} name="key" size={25}/>
                        </View>
                        <View style={GlobalStyles.row}>
                            <PrimaryButton
                                text={'התחברות'}
                                width={'95%'}
                                colors={LINEAR_GRADIENT_BLUE}
                                onClick={onLogin}
                            />
                        </View>
                        <View style={GlobalStyles.row}>
                            <PrimaryButton
                                text={'הרשמה'}
                                colors={LINEAR_GRADIENT_GREY}
                                onClick={signup}
                            />
                            <PrimaryButton
                                text={'איפוס סיסמא'}
                                colors={LINEAR_GRADIENT_GREY}
                                onClick={forgotPassword}
                            />
                        </View>
                    </Animated.View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
})

export default Login;
