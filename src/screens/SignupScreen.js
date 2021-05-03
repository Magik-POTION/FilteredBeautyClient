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

export default function SignupScreen() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmation, setConfirmation] = React.useState("");

    const handleSubmitButton = async () => {
        try {
            if (password != confirmation)
                throw new Error("Passwords are not the same");
            await AppController.userController.signUp(email, password);
        } catch (error) {
            Alert.alert("Sign Up Error", error.message);
        }
    };

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
                <TextInput
                    style={styles.textInput}
                    secureTextEntry={true}
                    placeholder="password confirmation"
                    value={confirmation}
                    onChangeText={(value) => setConfirmation(value)}
                />
            </View>
            <View style={styles.bottom}>
                <TouchableOpacity
                    style={[styles.button, styles.signupButton]}
                    onPress={handleSubmitButton}
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
    signupButton: {
        backgroundColor: colours.secondary,
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
