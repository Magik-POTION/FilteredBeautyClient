import React from "react";
import {
    View,
    StyleSheet,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    Alert,
} from "react-native";

import colours from "../../config/colours";

import AppController from "../controllers/AppController";

export default function LoginScreen() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    async function handleSubmit() {
        try {
            await AppController.userController.signIn(email, password);
            console.log("log in successfull")
        } catch (error) {
            Alert.alert("Log In Error", error.message);
        }
    }

    return (
        <View style={styles.background}>
            <Image
                style={styles.logo}
                source={require("../../assets/logo.png")}
            />
            <TextInput
                style={styles.textInputA}
                placeholder="email@email.com"
                onChangeText={(value) => setEmail(value)}
                value={email}
            />
            <TextInput
                style={styles.textInputB}
                secureTextEntry={true}
                placeholder="password"
                onChangeText={(value) => setPassword(value)}
                value={password}
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Login</Text>
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
    buttonText: {
        color: "white",
        textAlign: "center",
        textTransform: "uppercase",
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
        top: 120,
    },
    textInputA: {
        position: "absolute",
        top: 400,
        marginTop: 20,
        width: "80%",
        height: 40,
        textAlign: "center",
        backgroundColor: colours.grey,
        borderRadius: 50,
    },
    textInputB: {
        position: "absolute",
        top: 450,
        marginTop: 20,
        width: "80%",
        height: 40,
        textAlign: "center",
        backgroundColor: colours.grey,
        borderRadius: 50,
    },
});
