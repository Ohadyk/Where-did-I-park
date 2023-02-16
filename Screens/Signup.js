import React, { useRef, useState } from "react";
import { StyleSheet, TextInput, View, Dimensions, Text } from "react-native";
import GlobalStyles from "../StyleSheet/GlobalStyle";
import Entypo from "react-native-vector-icons/Entypo";
import PrimaryButton from "../Components/PrimaryButton";
import Lottie from "lottie-react-native";
import { LINEAR_GRADIENT_BLUE } from "../StyleSheet/GlobalColors";
import auth from '@react-native-firebase/auth';

const { width, height } = Dimensions.get("screen");

const Signup = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');

    const [emailValidError, setEmailValidError] = useState('');
    const [passwordValidError, setPasswordValidError] = useState('');
    const [confPasswordValidError, setConfPasswordValidError] = useState('');
    const [serverError, setServerError] = useState(false);

    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const confPasswordRef = useRef(null)

    // Validate the inputs when click on signup button
    const onSignup = async () => {
        const emailValidationRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        setEmailValidError('')
        setPasswordValidError('')
        setConfPasswordValidError('')
        setServerError(false)

        if (!email) {
            setEmailValidError('אימייל הוא שדה חובה')
            emailRef.current.focus()
        }
        else if(!password) {
            setPasswordValidError('סיסמא היא שדה חובה')
            passwordRef.current.focus()
        }
        else if(!confPassword || confPassword === '') {
            setConfPasswordValidError('אימות סיסמא היא שדה חובה')
            confPasswordRef.current.focus()
        }
        else {
            if(!emailValidationRegex.test(email)) {
                setEmailValidError('אימייל לא חוקי')
                emailRef.current.focus()
            }
            else if(password.length < 6) {
                setPasswordValidError('אורך לא חוקי')
                setConfPassword('')
                setPassword('')
                passwordRef.current.focus()
            }
            else if (password !== confPassword) {
                setPasswordValidError('וודא שהסיסמאות זהות')
                setConfPassword('')
                setPassword('')
                passwordRef.current.focus()
            }
            else {
                await signupHandler()
            }
        }
    };

    // Creates the new user if the inputs are valid
    const signupHandler = async () => {
        try {
            await auth().createUserWithEmailAndPassword(email, password);
            navigation.navigate('התחברות')
            alert('נרשמת בהצלחה')
        }
        catch (error) {
            console.log(error)

            if (error.code === 'auth/email-already-exists') {
                setEmailValidError('אימייל זה כבר נמצא בשימוש')
                emailRef.current.focus()
            }
            else if (error.code === 'auth/invalid-email') {
                setEmailValidError('אימייל לא חוקי')
                emailRef.current.focus()
            }
            else if (error.code === 'auth/invalid-password') {
                setPasswordValidError('סיסמא לא חוקית')
                passwordRef.current.focus()
            }
            else {
                setServerError(true)
            }
        }
    };

    return (
        <View style={GlobalStyles.screenContainer}>
            <View style={GlobalStyles.formContainer}>
                <View style={styles.iconSize}>
                    <Lottie
                        source={require('../assets/lottiefiles/86234-select-location.json')}
                        autoPlay
                        loop={true}
                        style={{ width: '100%', height: '100%', alignSelf: 'center' }}
                    />
                </View>
                <View style={{ width: '100%', marginBottom: 20 }}>
                    <View style={[GlobalStyles.inputContainer, GlobalStyles.shadow]}>
                        <TextInput
                            style={GlobalStyles.input}
                            placeholder={'אימייל'}
                            value={email}
                            ref={emailRef}
                            onChangeText={(value) => {
                                setEmail(value);
                            }}
                        />
                        <Entypo style={GlobalStyles.inputIcon} name='mail' size={25} />
                    </View>
                    {emailValidError ? <Text style={GlobalStyles.inputErrorTxt}>{emailValidError}</Text> : null}
                </View>
                <View style={{ width: '100%', marginBottom: 20 }}>
                    <View style={[GlobalStyles.inputContainer, GlobalStyles.shadow]}>
                        <TextInput
                            style={GlobalStyles.input}
                            placeholder={'סיסמא'}
                            secureTextEntry={true}
                            value={password}
                            ref={passwordRef}
                            maxLength={12}
                            onChangeText={(value) => {
                                setPassword(value);
                            }}
                        />
                        <Entypo style={GlobalStyles.inputIcon} name='key' size={25} />
                    </View>
                    <Text style={styles.inputTxt}>סיסמא באורך 6-12 תווים</Text>
                    {passwordValidError ? <Text style={GlobalStyles.inputErrorTxt}>{passwordValidError}</Text> : null}
                </View>
                <View style={{ width: '100%', marginBottom: 20 }}>
                    <View style={[GlobalStyles.inputContainer, GlobalStyles.shadow]}>
                        <TextInput
                            style={GlobalStyles.input}
                            placeholder={'אימות סיסמא'}
                            secureTextEntry={true}
                            value={confPassword}
                            ref={confPasswordRef}
                            maxLength={12}
                            onChangeText={(value) => {
                                setConfPassword(value);
                            }}
                        />
                        <Entypo style={GlobalStyles.inputIcon} name='key' size={25} />
                    </View>
                    <Text style={styles.inputTxt}>סיסמא באורך 6-12 תווים</Text>
                    {confPasswordValidError ? <Text style={GlobalStyles.inputErrorTxt}>{confPasswordValidError}</Text> : null}
                </View>
                {serverError ? <Text style={GlobalStyles.inputErrorTxt}>שגיאה. אנא נסה שוב מאוחר יותר</Text> : null}
                <View style={GlobalStyles.row}>
                    <PrimaryButton
                        text={'הרשם'}
                        width={'95%'}
                        colors={LINEAR_GRADIENT_BLUE}
                        onClick={onSignup}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    iconSize: {
        width: width / 5,
        height: height / 5,
    },

    inputTxt: {
        marginRight: 10,
        color: '#BCBCBC'
    },

});

export default Signup;
