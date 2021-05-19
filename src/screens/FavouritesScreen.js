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

    // TODO: Add Favourites Icon
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
                <Avatar source={{ uri: item.image_link }} />
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.brand}</ListItem.Subtitle>
                </ListItem.Content>
                <Icon
                    type="material"
                    name="favorite"
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
                backgroundColor = {colours.background}
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
                        color= {colours.black}
                        onPress={() => {
                            if (AppService.userModel.isAnonymous) {
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
