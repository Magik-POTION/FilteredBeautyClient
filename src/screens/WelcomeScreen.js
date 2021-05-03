import React from "react";
import {
    View,
    StyleSheet,
    Image,
    Text,
    Alert,
    TouchableOpacity,
} from "react-native";
import colours from "../../config/colours";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
    const navigation = useNavigation();

    const handleLoginButton = () => navigation.navigate("Login");
    const handleSignUpButton = () => navigation.navigate("SignUp");

    return (
        <View style={styles.background}>
            <View style={styles.top}>
                <Image
                    style={styles.logo}
                    source={require("../../assets/logo.png")}
                />
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity
                    style={[styles.button, styles.loginButton]}
                    onPress={handleLoginButton}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.signupButton]}
                    onPress={handleSignUpButton}
                >
                    <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colours.background,
        alignItems: "center",
    },
    bottom: {
        flex: 1,
        width: "100%",
        height: "30%",
        justifyContent: "flex-end"
    },
    button: {
        width: "100%",
        height: 70,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        fontSize: 20,
        color: "white",
        textTransform: "uppercase",
    },
    loginButton: {
        backgroundColor: colours.primary,
    },
    logo: {
        top: "20%",
        width: 195,
        height: 195,
    },
    signupButton: {
        backgroundColor: colours.secondary,
    },
    top: {
        flex: 1
    }

});
