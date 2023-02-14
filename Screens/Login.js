import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import Animated, { BounceInUp, ZoomInDown } from "react-native-reanimated";
import PrimaryButton from "../Components/PrimaryButton";
import appIcon from '../assets/icon.png';
import GlobalStyles from '../StyleSheet/GlobalStyle';
import Entypo from "react-native-vector-icons/Entypo";

const Login = ({navigation}) => {

    const signup = () => {
        navigation.navigate('הרשמה')
    }

    const login = () => {
        console.log('login')
    }

    return(
        <View style={GlobalStyles.screenContainer}>
            <Animated.Image
              source={appIcon}
              style={GlobalStyles.icon}
              entering={BounceInUp.duration(700).delay(500)}
            />
            <Animated.View
              style={styles.formContainer}
              entering={ZoomInDown.duration(500)}
            >
                <View style={[styles.inputContainer, styles.shadow]}>
                    <TextInput
                      style={styles.input}
                      placeholder={'אימייל'}
                    />
                    <Entypo style={styles.icon} name="mail" size={25}/>
                </View>
                <View style={[styles.inputContainer, styles.shadow]}>
                    <TextInput
                      style={styles.input}
                      placeholder={'סיסמא'}
                    />
                    <Entypo style={styles.icon} name="lock" size={25}/>
                </View>
                <View style={styles.row}>
                    <PrimaryButton
                        text={'התחברות'}
                        colors={[ '#00C2FF', '#0047FF' ]}
                        onClick={login}
                    />
                    <PrimaryButton
                        text={'הרשמה'}
                        colors={[ '#00FF9E', '#0CFF00' ]}
                        onClick={signup}
                    />
                </View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        width: '100%',
        flexDirection: 'row-reverse',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    formContainer: {
        width: '100%',
        alignItems: 'center',
    },

    inputContainer: {
        margin: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 20,
        backgroundColor: 'white',
        borderColor: '#838383',
        borderRadius: 10,
    },

    input: {
        width: '100%',
        textAlign: 'right',
    },

    icon: {
        color: '#838383',
        marginLeft: 10
    },

    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})

export default Login;
