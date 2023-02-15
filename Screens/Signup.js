import React, { useRef, useState } from "react";
import { StyleSheet, TextInput, View, Dimensions, Text } from "react-native";
import GlobalStyles from "../StyleSheet/GlobalStyle";
import Entypo from "react-native-vector-icons/Entypo";
import PrimaryButton from "../Components/PrimaryButton";
import Lottie from "lottie-react-native";
import { LINEAR_GRADIENT_BLUE } from "../StyleSheet/GlobalColors";

const { width, height } = Dimensions.get("screen");

const Signup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");

    const isFormValid = () => {
        if (!email || !password || !confPassword) {
            return false;
        } else {
            if (password !== confPassword) {
                return false;
            } else {
                return true;
            }
        }
    };

    const signup = () => {
        if (!email || !password || !confPassword) {
            console.log("invalid");
        } else {
            if (password !== confPassword) {
                console.log("invalid");
            } else {
                console.log("valid");
            }
        }
    };

    return (
        <View style={GlobalStyles.screenContainer}>
            <View style={styles.iconSize}>
                <Lottie
                    source={require("../assets/lottiefiles/86234-select-location.json")}
                    autoPlay
                    loop={false}
                    style={{ width: "100%", height: "100%", alignSelf: "center" }}
                />
            </View>
            <View style={GlobalStyles.formContainer}>
                <View style={[GlobalStyles.inputContainer, GlobalStyles.shadow]}>
                    <TextInput
                        style={GlobalStyles.input}
                        placeholder={"אימייל"}
                        onChangeText={(value) => {
                            setEmail(value);
                        }}
                    />
                    <Entypo style={GlobalStyles.inputIcon} name="mail" size={25} />
                </View>
                <View style={{ width: '100%', marginVertical: 20 }}>
                    <View style={[GlobalStyles.inputContainer, GlobalStyles.shadow]}>
                        <TextInput
                            style={GlobalStyles.input}
                            placeholder={"סיסמא"}
                            maxLength={8}
                            onChangeText={(value) => {
                                setPassword(value);
                            }}
                        />
                        <Entypo style={GlobalStyles.inputIcon} name="key" size={25} />
                    </View>
                    <Text style={styles.inputTxt}>סיסמא באורך 6-8 תווים</Text>
                </View>
                <View style={{ width: '100%', marginBottom: 20 }}>
                    <View style={[GlobalStyles.inputContainer, GlobalStyles.shadow]}>
                        <TextInput
                            style={GlobalStyles.input}
                            placeholder={"אימות סיסמא"}
                            maxLength={8}
                            onChangeText={(value) => {
                                setConfPassword(value);
                            }}
                        />
                        <Entypo style={GlobalStyles.inputIcon} name="key" size={25} />
                    </View>
                    <Text style={styles.inputTxt}>סיסמא באורך 6-8 תווים</Text>
                </View>
                <View style={GlobalStyles.row}>
                    <PrimaryButton
                        text={"הרשם"}
                        width={"95%"}
                        colors={LINEAR_GRADIENT_BLUE}
                        onClick={signup}
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
