import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import LoginScreen from "../screens/LoginScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import SignupScreen from "../screens/SignupScreen";

function HomeScreen({ navigation }) {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text>Home Screen</Text>
            <Button
                title="Go to next screen"
                /* navigation.push() can be used to add the screen onto the navigation stack */
                /* navigation.goBack() can be used to go to previous screen */
                /* navigation.popToTop() goes back to the first screen in the stack*/
                onPress={() =>
                    /* Passing params goes inside navigate */
                    navigation.navigate("Details", {
                        userName: "Trae",
                        otherParam: "learning routing",
                    })
                }
            />
        </View>
    );
}

function DetailsScreen({ navigation }) {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text>Details Screen</Text>
            /* Fetching param from the other screen */ /* Avoid passing params
            that is used by multiple screen, should be in GLOBAL store */
            <Text>username: {JSON.stringify(userName)}</Text>
            <Text>otherparam: {JSON.stringify(otherParam)}</Text>
        </View>
    );
}
function SkinProfileScreen({ navigation }) {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text>Skin Profile Screen</Text>
        </View>
    );
}
function CheckoutScreen({ navigation }) {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text>Checkout Screen</Text>
        </View>
    );
}
function SettingScreen({ navigation }) {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text>Setting Screen</Text>
        </View>
    );
}
function ProfileScreen({ navigation }) {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text>Profile Screen</Text>
        </View>
    );
}
function HistoryScreen({ navigation }) {
    return (
        <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
            <Text>History Screen</Text>
        </View>
    );
}
const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Welcome"
                    component={WelcomeScreen}
                    options={{ title: "Welcome" }}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ title: "Login" }}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignupScreen}
                    options={{ title: "SignUp" }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ title: "Home" }}
                />
                <Stack.Screen
                    name="Details"
                    component={DetailsScreen}
                    options={{ title: "Details" }}
                />
                <Stack.Screen
                    name="SkinProfile"
                    component={SkinProfileScreen}
                    options={{ title: "SkinProfile" }}
                />
                <Stack.Screen
                    name="Checkout"
                    component={CheckoutScreen}
                    options={{ title: "Checkout" }}
                />
                <Stack.Screen
                    name="Setting"
                    component={SettingScreen}
                    options={{ title: "Setting" }}
                />
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{ title: "Profile" }}
                />
                <Stack.Screen
                    name="History"
                    component={HistoryScreen}
                    options={{ title: "History" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
