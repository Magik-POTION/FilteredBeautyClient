import React from "react";
import { View, StyleSheet, Linking } from "react-native";
import { Button } from "react-native-elements";

export default function SettingsScreen() {
    // TODO: Add URLS BELOW
    const handleAboutUsOnPress = () => Linking.openURL("");
    const handleTermsOnPress = () => Linking.openURL("");
    const handlePrivacyOnPress = () => Linking.openURL("");

    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <Button
                containerStyle={styles.buttonContainer}
                title={"ABOUT US"}
                onPress={handleAboutUsOnPress}
            />
            <Button
                containerStyle={styles.buttonContainer}
                onPress={handleTermsOnPress}
                title={"TERMS AND CONDITION"}
            />
            <Button
                containerStyle={styles.buttonContainer}
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
});
