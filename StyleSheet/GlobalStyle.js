import { StyleSheet } from 'react-native';

const GlobalStyles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white'
    },

    row: {
        width: '100%',
        flexDirection: 'row-reverse',
        justifyContent: 'space-around',
        alignItems: 'center'
    },

    formContainer: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: 'center',
    },

    inputContainer: {
        width: '100%',
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 40,
        backgroundColor: 'white',
        borderColor: '#838383',
        borderRadius: 10,
    },

    input: {
        width: '100%',
        textAlign: 'right',
    },

    inputIcon: {
        color: '#838383',
        marginLeft: 10,
        marginRight: 50
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
    },

    appIcon: {
        width: 141.46,
        height: 225.79,
        marginBottom: 30,
    }
})

export default GlobalStyles;
