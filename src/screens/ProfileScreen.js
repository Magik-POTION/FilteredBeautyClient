import React from "react";
import { View, ScrollView } from "react-native";
import AppModel from "../models/AppModel";
import useObservable from "../utils/useObservable";
import { Button, Text, Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import AppController from "../controllers/AppController";

export default function ProfileScreen() {
    const navigation = useNavigation();
    const email = useObservable(AppModel.userModel.email);

    const handleLogoutOnPress = async () => {
        AppController.favouritesController.reset();
        AppController.historyController.reset();
        await AppController.userController.signOut();
        navigation.navigate("Home");
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: "center", marginVertical: 16 }}>
                <Text h4>{email}</Text>
            </View>
            <Divider />
            <View style={{ alignItems: "center", marginVertical: 16 }}>
                <Text h4>Skin Profile</Text>
            </View>
            <ScrollView
                style={{
                    flex: 1,
                }}
            >
                {/*
                TODO: Implement Skin Profile Options here.
             */}
            </ScrollView>
            <Divider />
            <Button
                containerStyle={{ margin: 16 }}
                onPress={handleLogoutOnPress}
                title={"LOG OUT"}
            />
        </View>
    );
}
