import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Animated, { BounceInUp, ZoomInDown } from "react-native-reanimated";
import PrimaryButton from "../Components/PrimaryButton";
import appIcon from '../assets/icon.png';
import GlobalStyles from '../StyleSheet/GlobalStyle';
import Entypo from "react-native-vector-icons/Entypo";
import { LINEAR_GRADIENT_BLUE, LINEAR_GRADIENT_GREY } from "../StyleSheet/GlobalColors";

const Login = ({navigation}) => {

    const signup = () => {
        navigation.navigate('הרשמה')
    }

    const forgotPassword = () => {
        navigation.navigate('איפוס סיסמא')
    }

    const login = () => {
        console.log('login')
    }

    return(
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
                    />
                    <Entypo style={GlobalStyles.inputIcon} name="mail" size={25}/>
                </View>
                <View style={[GlobalStyles.inputContainer, {marginBottom: 20}, GlobalStyles.shadow]}>
                    <TextInput
                      style={GlobalStyles.input}
                      placeholder={'סיסמא'}
                    />
                    <Entypo style={GlobalStyles.inputIcon} name="key" size={25}/>
                </View>
                <View style={GlobalStyles.row}>
                    <PrimaryButton
                        text={'התחברות'}
                        width={'95%'}
                        colors={LINEAR_GRADIENT_BLUE}
                        onClick={login}
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
