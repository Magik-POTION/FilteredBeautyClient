import React from "react";
import { Alert, StatusBar } from "react-native";
import AppLoading from "expo-app-loading";
import AppService from "./src/services/AppService";
import Navigation from "./src/navigations/Navigation";

export default App = () => {
    const [isLoading, setIsLoading] = React.useState(true);

    async function load() {
        try {
            await AppService.load();
            setIsLoading(false);
        } catch (error) {
            Alert.alert("Error Loading Assets", error.message, [
                {
                    text: "Retry",
                    onPress: () => load(),
                },
            ]);
        }
    }

    React.useEffect(() => {
        /**
         * Sets status bar text color
         */
        StatusBar.setBarStyle("light-content");
    }, []);

    React.useEffect(() => {
        load();
    }, []);

    return isLoading ? <AppLoading /> : <Navigation />;
};
