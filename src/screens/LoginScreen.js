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
            <View style={styles.top}>
                <Image
                    style={styles.logo}
                    source={require("../../assets/logo.png")}
                />
            </View>
            <View style={styles.middle}>
                <TextInput
                    style={styles.textInput}
                    placeholder="email@email.com"
                    value={email}
                    onChangeText={(value) => setEmail(value)}
                />
                <TextInput
                    style={styles.textInput}
                    secureTextEntry={true}
                    placeholder="password"
                    onChangeText={(value) => setPassword(value)}
                    value={password}
                />
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity
                    style={[styles.button, styles.loginButton]}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Login</Text>
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
    middle: {
        top: "10%",
        flex: 2,
        width: "80%"
    },
    textInput: {
        margin: "2%",
        padding: "5%",
        textAlign: "center",
        backgroundColor: colours.grey,
        borderRadius: 50,
    },
    top: {
        flex: 1
    }
});
