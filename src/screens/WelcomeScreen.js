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
            <Image
                style={styles.logo}
                source={require("../../assets/logo.png")}
            />
            <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLoginButton}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.signupButton}
                onPress={handleSignUpButton}
            >
                <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colours.background,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    loginButton: {
        width: "100%",
        height: 70,
        backgroundColor: colours.primary,
        justifyContent: "center",
    },
    logo: {
        width: 195,
        height: 195,
        position: "absolute",
        top: 200,
    },
    signupButton: {
        width: "100%",
        height: 70,
        backgroundColor: colours.secondary,
        justifyContent: "center",
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        textTransform: "uppercase",
    },
});
