import React from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    Alert
} from 'react-native';

import colours from "../../config/colours";

function SignupScreen() {

    return (
        <View style={styles.background}>
            <Image style={styles.logo} source={require("../../assets/logo.png")} />
            <TextInput
                style={styles.textInputA}
                placeholder='email@email.com'
            />
            <TextInput
                style={styles.textInputB}
                secureTextEntry={true}
                placeholder='password'
            />
            <TouchableOpacity style={styles.signupButton} onPress={() => Alert.alert("clicked")}>
                <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colours.background,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        textTransform: 'uppercase'
    },
    logo: {
        width: 195,
        height: 195,
        position: 'absolute',
        top: 120
    },
    signupButton: {
        width: '100%',
        height: 70,
        backgroundColor: colours.secondary,
        justifyContent: "center"
    },
    textInputA: {
        position: 'absolute',
        top: 400,
        marginTop: 20,
        width: "80%",
        height: 40,
        textAlign: 'center',
        backgroundColor: colours.grey,
        borderRadius: 50
    },
    textInputB: {
        position: 'absolute',
        top: 450,
        marginTop: 20,
        width: "80%",
        height: 40,
        textAlign: 'center',
        backgroundColor: colours.grey,
        borderRadius: 50
    }
})

export default SignupScreen;