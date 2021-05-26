import React from "react";
import { FlatList, View } from "react-native";
import { ListItem, Divider, Header, Icon, Avatar } from "react-native-elements";
import useObservable from "../utils/useObservable";
import AppService from "../services/AppService";
import { useNavigation } from "@react-navigation/native";
import colours from "../../config/colours";

export default function FavouritesScreen() {
    const navigation = useNavigation();
    const productList = useObservable(AppService.favouritesModel.products);

    function renderItem({ item }) {
        return (
            <ListItem
                onPress={() => {
                    AppService.productDetailController.selectItem(item);
                    AppService.historyController.addProduct(
                        AppService.userModel.uid.getValue(),
                        item
                    );
                    navigation.navigate("Details");
                }}
            >
                <Avatar
                    rounded
                    size='medium'
                    source={{ uri: item.image_link }} />
                <ListItem.Content style={{ backgroundColor: colours.secondary, padding: 5, borderRadius: 15, borderBottomColor: colours.accent, borderBottomWidth: 3 }}>
                    <ListItem.Title style={{ fontWeight: 'bold', color: colours.background, marginLeft: 10, fontSize: 15 }}>{item.name}</ListItem.Title>
                    <ListItem.Subtitle style={{ color: colours.accent, marginLeft: 10, fontSize: 12 }}>{item.brand}</ListItem.Subtitle>
                </ListItem.Content>
                <Icon
                    type="material"
                    name="favorite"
                    color={colours.primary}
                    onPress={() => {
                        AppService.favouritesController.removeProduct(
                            AppService.userModel.uid.getValue(),
                            item
                        );
                    }}
                />
            </ListItem>
        );
    }

    const keyExtractor = (item) => item.name;

    return (
        <View style={{ flex: 1 }}>
            <Header
                backgroundColor={colours.background}
                leftComponent={
                    <Icon
                        type="material"
                        name="settings"
                        color={colours.black}
                        onPress={() => navigation.navigate("Settings")}
                    />
                }
                centerComponent={{
                    text: "FAVOURITES",
                    style: { color: colours.black },
                }}
                rightComponent={
                    <Icon
                        type="material"
                        name="person"
                        color={colours.black}
                        onPress={() => {
                            if (AppService.userModel.isAnonymous.getValue()) {
                                navigation.navigate("Authentication");
                            } else {
                                navigation.navigate("Profile");
                            }
                        }}
                    />
                }
            />
            <FlatList
                ItemSeparatorComponent={Divider}
                extraData={productList}
                data={productList}
                renderItem={renderItem}
                style={{ flex: 1 }}
                keyExtractor={keyExtractor}
            />
        </View>
    );
}
