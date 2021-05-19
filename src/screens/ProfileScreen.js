import React from "react";
import { View, ScrollView } from "react-native";
import AppService from "../services/AppService";
import useObservable from "../utils/useObservable";
import { Button, Text, Divider, Switch, ListItem } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
    const navigation = useNavigation();
    const email = useObservable(AppService.userModel.email);
    const isHypoAllergenic = useObservable(
        AppService.skinProfileModel.Hypoallergenic
    );
    const isDairyFree = useObservable(AppService.skinProfileModel.Dairy_Free);
    const isGlutenFree = useObservable(AppService.skinProfileModel.Gluten_Free);
    const isPeanutFreeProduct = useObservable(
        AppService.skinProfileModel.Peanut_Free_Product
    );
    const isSugarFree = useObservable(AppService.skinProfileModel.Sugar_Free);
    const isAlcohalFree = useObservable(
        AppService.skinProfileModel.alcohol_free
    );
    const isOilFree = useObservable(AppService.skinProfileModel.oil_free);
    const isSiliconeFree = useObservable(
        AppService.skinProfileModel.silicone_free
    );

    const handleLogoutOnPress = async () => {
        AppService.favouritesController.reset();
        AppService.historyController.reset();
        await AppService.userController.signOut();
        navigation.navigate("Home");
    };

    /**
     * Handles switch Changes
     * @param {String} name
     */
    function handleSwitch(name, value) {
        AppService.skinProfileController.set(name, value);
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
                    <Switch
                        value={isHypoAllergenic}
                        onValueChange={(value) =>
                            handleSwitch("Hypoallergenic", value)
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Title>Oily Skin</ListItem.Title>
                    </ListItem.Content>
                    <Switch
                        value={isOilFree}
                        onValueChange={(value) =>
                            handleSwitch("oil_free", value)
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Title>Dry Skin</ListItem.Title>
                    </ListItem.Content>
                    <Switch
                        value={isAlcohalFree}
                        onValueChange={(value) =>
                            handleSwitch("alcohol_free", value)
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Title>Allergic to Dairy</ListItem.Title>
                    </ListItem.Content>
                    <Switch
                        value={isDairyFree}
                        onValueChange={(value) =>
                            handleSwitch("Dairy_Free", value)
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Title>Allergic to Gluten</ListItem.Title>
                    </ListItem.Content>
                    <Switch
                        value={isGlutenFree}
                        onValueChange={(value) =>
                            handleSwitch("Gluten_Free", value)
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Title>Allergic to Peanuts</ListItem.Title>
                    </ListItem.Content>
                    <Switch
                        value={isPeanutFreeProduct}
                        onValueChange={(value) =>
                            handleSwitch("Peanut_Free_Product", value)
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Title>Allergic to Sugar</ListItem.Title>
                    </ListItem.Content>
                    <Switch
                        value={isSugarFree}
                        onValueChange={(value) =>
                            handleSwitch("Sugar_Free", value)
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItem.Content>
                        <ListItem.Title>Allergic to Silicone</ListItem.Title>
                    </ListItem.Content>
                    <Switch
                        value={isSiliconeFree}
                        onValueChange={(value) =>
                            handleSwitch("silicone_free", value)
                        }
                    />
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
