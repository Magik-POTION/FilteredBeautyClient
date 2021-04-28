import React from "react";
import { enableScreens } from "react-native-screens";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ROUTES from "../assets/enums/ROUTES";
import Home from "./Home";
import Authentication from "./Authentication";

export default () => {
    enableScreens();
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    stackAnimation: "none",
                }}
            >
                <Stack.Screen name={ROUTES.HOME} component={Home} />
                <Stack.Screen
                    name={ROUTES.AUTHENTICATION}
                    component={Authentication}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
