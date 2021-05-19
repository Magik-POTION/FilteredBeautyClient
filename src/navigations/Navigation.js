import "react-native-gesture-handler";
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import AuthenticationScreen from "../screens/AuthenticationScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import HistoryScreen from "../screens/HistoryScreen";
import ProductSearchScreen from "../screens/ProductSearchScreen";
import DetailsScreen from "../screens/DetailsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Icon } from "react-native-elements";
import colours from "../../config/colours";


function TabNavigation() {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: colours.primary,
                inactiveTintColor: colours.black,
            }}
        >
            <Tab.Screen
                name="Search"
                component={ProductSearchScreen}
                options={{
                    tabBarIcon: ({color}) => <Icon name="search" type="material"  color={color} />,
                }}
            />
            <Tab.Screen
                name="Favourites"
                component={FavouritesScreen}
                options={{
                    tabBarIcon: ({color}) => <Icon name="favorite" type="material" color={color} />,
                }}
            />
            <Tab.Screen
                name="History"
                component={HistoryScreen}
                options={{
                    tabBarIcon: ({color}) => <Icon name="history" type="material"  color={color} />,
                }}
            />
        </Tab.Navigator>
    );
}

export default function Navigation() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerTintColor: colours.black
                }}>
                <Stack.Screen
                    name="Home"
                    component={TabNavigation}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Authentication"
                    component={AuthenticationScreen}
                    options={{ title: "Authentication" }}
                />
                <Stack.Screen
                    name="Signup"
                    component={SignupScreen}
                    options={{ title: "Signup" }}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ title: "Login" }}
                />
                <Stack.Screen
                    name="Details"
                    component={DetailsScreen}
                    options={{ title: "Details" }}
                />
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{ title: "Profile" }}
                />
                <Stack.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{ 
                        title: "Settings" }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
