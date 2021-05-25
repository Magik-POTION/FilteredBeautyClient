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
import AppService from "../services/AppService";
import { useNavigation } from "@react-navigation/native";
import colours from "../../config/colours";

export default function ProductSearchScreen() {
    const navigation = useNavigation();
    const productList = useObservable(AppService.searchModel.products);
    const [search, setSearch] = useState("");

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
                    size="medium"
                    source={{ uri: item.image_link }}
                />
                <ListItem.Content style={{ backgroundColor: colours.secondary, borderRadius: 15, padding: 5, borderBottomColor: colours.accent, borderBottomWidth: 3 }} >
                    <ListItem.Title style={{ fontWeight: 'bold', color: colours.background, marginLeft: 10 }}>{item.name}</ListItem.Title>
                    <ListItem.Subtitle style={{ color: colours.accent, marginLeft: 10 }}>{item.brand}</ListItem.Subtitle>
                </ListItem.Content>
                <Icon type="material" name="chevron-right" color={colours.accent} />
            </ListItem>
        );
    }

    const keyExtractor = (item) => item.id.toString();

    const handleSearchChange = (value) => {
        setSearch(value);
        AppService.searchController.search(value);
    };

    return (
        <View style={{ flex: 1, }}>
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
                    text: "SEARCH",
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
            <SearchBar
                placeholder={"Search Product By Name or Brand"}
                onChangeText={handleSearchChange}
                value={search}
                lightTheme={true}
                placeholderTextColor={colours.secondary}
                round={true}
                containerStyle={{ backgroundColor: colours.background, }}
            />
            <FlatList
                ItemSeparatorComponent={Divider}
                extraData={productList}
                data={productList}
                renderItem={renderItem}
                style={{ flex: 1, }}
                keyExtractor={keyExtractor}
            />
        </View>
    );
}
