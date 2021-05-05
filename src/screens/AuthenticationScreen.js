import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import colours from "../../config/colours";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-elements";

export default function AuthenticationScreen() {
    const navigation = useNavigation();

    const handleLoginButton = () => navigation.navigate("Login");
    const handleSignUpButton = () => navigation.navigate("SignUp");

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: colours.background,
            }}
        >
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Image
                    style={{
                        width: Dimensions.get("window").width * 0.5,
                        height: Dimensions.get("window").width * 0.5,
                    }}
                    source={require("../../assets/logo.png")}
                />
            </View>
            <Button
                containerStyle={{
                    marginBottom: 16,
                    marginHorizontal: 16,
                }}
                buttonStyle={{
                    backgroundColor: colours.primary,
                }}
                onPress={handleLoginButton}
                title={"LOG IN"}
                titleStyle={styles.buttonText}
            />
            <Button
                containerStyle={{
                    marginBottom: 16,
                    marginHorizontal: 16,
                }}
                buttonStyle={{
                    backgroundColor: colours.secondary,
                }}
                onPress={handleSignUpButton}
                title={"SIGN UP"}
                titleStyle={styles.buttonText}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 20,
        color: "white",
        textTransform: "uppercase",
    },
});
