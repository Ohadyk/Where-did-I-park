import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const PrimaryButton = ({text, colors, onClick}) => {

    return(
          <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={colors}
                style={styles.gradientBtn}
          >
              <TouchableOpacity
                    onPress={onClick}
                    style={styles.opacityBtn}
                    activeOpacity={0.7}
              >
                  <Text>{text}</Text>
              </TouchableOpacity>
          </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradientBtn: {
        width: '45%',
        alignItems: 'center',
        borderRadius: 10,
        margin: 20,
    },

    opacityBtn: {
        margin: 1,
        width: '98%',
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: 'white',
    }
})

export default PrimaryButton;
