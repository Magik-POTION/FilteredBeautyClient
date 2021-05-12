import React, { useState } from "react";
import { FlatList, View } from "react-native";
import {
    ListItem,
    Divider,
    SearchBar,
    Header,
    Icon,
    Avatar,
} from "react-native-elements";
import useObservable from "../utils/useObservable";
import AppModel from "../models/AppModel";
import { useNavigation } from "@react-navigation/native";
import AppController from "../controllers/AppController";

export default function ProductSearchScreen() {
    const navigation = useNavigation();
    const productList = useObservable(AppModel.searchModel.products);
    const [search, setSearch] = useState("");

    function renderItem({ item }) {
        return (
            <ListItem
                onPress={() => {
                    AppController.productDetailController.selectItem(item);
                    AppController.historyController.addProduct(
                        AppModel.userModel.uid.getValue(),
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
                <Icon type="material" name="chevron-right" />
            </ListItem>
        );
    }

    const keyExtractor = (item) => item.id.toString();

    const handleSearchChange = (value) => {
        setSearch(value);
        AppController.searchController.search(value);
    };

    return (
        <View style={{ flex: 1 }}>
            <Header
                leftComponent={
                    <Icon
                        type="material"
                        name="settings"
                        color="white"
                        onPress={() => navigation.navigate("Settings")}
                    />
                }
                centerComponent={{ text: "SEARCH", style: { color: "white" } }}
                rightComponent={
                    <Icon
                        type="material"
                        name="person"
                        color="white"
                        onPress={() => {
                            if (AppModel.userModel.isAnonymous.getValue()) {
                                navigation.navigate("Authentication");
                            } else {
                                navigation.navigate("Profile");
                            }
                        }}
                    />
                }
            />
            <SearchBar
                placeholder={"Search Product By Name or Brand"}
                onChangeText={handleSearchChange}
                value={search}
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
