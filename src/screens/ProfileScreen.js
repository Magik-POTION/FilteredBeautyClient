import React from "react";
import { View, ScrollView } from "react-native";
import AppModel from "../models/AppModel";
import useObservable from "../utils/useObservable";
import { Button, Text, Divider, Switch, ListItem } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import AppController from "../controllers/AppController";

export default function ProfileScreen() {
    const navigation = useNavigation();
    const email = useObservable(AppModel.userModel.email);
    const isHypoAllergenic = useObservable(
        AppModel.skinProfileModel.isHypoAllergenic
    );
    const isDairyFree = useObservable(AppModel.skinProfileModel.isDairyFree);
    const isGlutenFree = useObservable(AppModel.skinProfileModel.isGlutenFree);
    const isPeanutFreeProduct = useObservable(
        AppModel.skinProfileModel.isPeanutFreeProduct
    );
    const isSugarFree = useObservable(AppModel.skinProfileModel.isSugarFree);
    const isAlcohalFree = useObservable(
        AppModel.skinProfileModel.isAlcohalFree
    );
    const isOilFree = useObservable(AppModel.skinProfileModel.isOilFree);
    const isSiliconeFree = useObservable(
        AppModel.skinProfileModel.isSiliconeFree
    );

    const handleLogoutOnPress = async () => {
        AppController.favouritesController.reset();
        AppController.historyController.reset();
        await AppController.userController.signOut();
        navigation.navigate("Home");
    };

    /**
     * Handles switch Changes
     * @param {String} name
     */
    function handleSwitch(name, value) {
        AppController.skinProfileController.set(name, value);
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: "center", marginVertical: 16 }}>
                <Text h4>{email}</Text>
            </View>
            <Divider />
            <View style={{ alignItems: "center", marginVertical: 16 }}>
                <Text h4>Skin Preferences</Text>
            </View>
            <ScrollView
                style={{
                    flex: 1,
                }}
            >
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Title>Sensitive Skin</ListItem.Title>
                    </ListItem.Content>
                    <Switch value={isHypoAllergenic} onValueChange={(value) => handleSwitch("isHypoAllergenic", value)} />
                </ListItem>
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Title>Oily Skin</ListItem.Title>
                    </ListItem.Content>
                    <Switch value={isOilFree} onValueChange={(value) => handleSwitch("isOilFree", value)}/>
                </ListItem>
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Title>Dry Skin</ListItem.Title>
                    </ListItem.Content>
                    <Switch value={isAlcohalFree} onValueChange={(value) => handleSwitch("isAlcohalFree", value)}/>
                </ListItem>
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Title>Allergic to Dairy</ListItem.Title>
                    </ListItem.Content>
                    <Switch value={isDairyFree} onValueChange={(value) => handleSwitch("isDairyFree", value)}/>
                </ListItem>
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Title>Allergic to Gluten</ListItem.Title>
                    </ListItem.Content>
                    <Switch value={isGlutenFree} onValueChange={(value) => handleSwitch("isGlutenFree", value)}/>
                </ListItem>
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Title>Allergic to Peanuts</ListItem.Title>
                    </ListItem.Content>
                    <Switch value={isPeanutFreeProduct} onValueChange={(value) => handleSwitch("isPeanutFreeProduct", value)}/>
                </ListItem>
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Title>Allergic to Sugar</ListItem.Title>
                    </ListItem.Content>
                    <Switch value={isSugarFree} onValueChange={(value) => handleSwitch("isSugarFree", value)}/>
                </ListItem>
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Title>Allergic to Silicone</ListItem.Title>
                    </ListItem.Content>
                    <Switch value={isSiliconeFree} onValueChange={(value) => handleSwitch("isSiliconeFree", value)}/>
                </ListItem>
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
