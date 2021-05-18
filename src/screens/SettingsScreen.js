import React from "react";
import { View, StyleSheet, Linking } from "react-native";
import { Button } from "react-native-elements";
import colours from "../../config/colours";


export default function SettingsScreen() {
    // TODO: Add URLS BELOW
    const handleTermsOnPress = () => Linking.openURL("https://drive.google.com/file/d/1sR4GdPrqIHiybjgRklNePtMPz8kqNTmI/view?usp=sharing");
    const handlePrivacyOnPress = () => Linking.openURL("https://drive.google.com/file/d/1fhoRFD4ZLo6ZdE-DHTX0NEzZpuw6vaug/view?usp=sharing");

    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
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
        backgroundColor: colours.accent
    },
    secondaryButton: {
        backgroundColor: colours.secondary
    }

});
