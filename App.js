import React from "react";
import { Alert, StatusBar } from "react-native";
import Navigation from "./src/navigations/Navigation";
import AppLoading from "expo-app-loading";
import AppController from "./src/controllers/AppController";

export default App = () => {
    const [isLoading, setIsLoading] = React.useState(true);

    async function load() {
        try {
            await AppController.load();
            setIsLoading(false);
        } catch (error) {
            Alert.alert(ERROR, error.message, [
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
