import React from "react";
import { Alert, StatusBar } from "react-native";
import PlaceHolderView from "./src/views/PlaceHolderView";
import AppLoading from "expo-app-loading";
import AppController from "./src/controllers/AppController";

export default App = () => {
    const [isLoading, setIsLoading] = React.useState(true);

    async function load() {
        try {
            await AppController.load();
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

    return isLoading ? <AppLoading /> : <PlaceHolderView />;
};
