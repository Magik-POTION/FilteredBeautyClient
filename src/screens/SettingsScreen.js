import React from "react";
import { View, StyleSheet, Linking, Image, Dimensions } from "react-native";
import { Button } from "react-native-elements";
import colours from "../../config/colours";

export default function SettingsScreen() {
    // const handleAboutUsOnPress = () => Linking.openURL("");
    const handleTermsOnPress = () =>
        Linking.openURL(
            "https://drive.google.com/file/d/1sR4GdPrqIHiybjgRklNePtMPz8kqNTmI/view?usp=sharing"
        );
    const handlePrivacyOnPress = () =>
        Linking.openURL(
            "https://drive.google.com/file/d/1fhoRFD4ZLo6ZdE-DHTX0NEzZpuw6vaug/view?usp=sharing"
        );

    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <Image
                style={{
                    width: Dimensions.get("window").width * 0.5,
                    height: Dimensions.get("window").width * 0.5,
                    marginLeft: 100,
                    marginBottom: 100
                }}
                source={require("../../assets/logo.png")}
            />
            {/* <Button
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.accentButton}
                title={"ABOUT US"}
                onPress={handleAboutUsOnPress}
            /> */}
            <Button
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.secondaryButton}
                onPress={handleTermsOnPress}
                title={"TERMS OF SERVICE"}
            />
            <Button
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.secondaryButton}
                title={"PRIVACY POLICY"}
                onPress={handlePrivacyOnPress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginHorizontal: 16,
        marginVertical: 8,
    },
    accentButton: {
        backgroundColor: colours.accent,
    },
    secondaryButton: {
        backgroundColor: colours.secondary,
        padding: 15,
        borderRadius: 30,
        borderBottomColor: colours.accent,
        borderBottomWidth: 5,
    },
});
