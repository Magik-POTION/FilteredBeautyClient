import React from "react";
import { FlatList, View } from "react-native";
import { ListItem, Divider, Header, Icon, Avatar } from "react-native-elements";
import useObservable from "../utils/useObservable";
import AppModel from "../models/AppModel";
import { useNavigation } from "@react-navigation/native";

export default function HistoryScreen() {
    const navigation = useNavigation();
    const productList = useObservable(AppModel.historyModel.products);

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

    const keyExtractor = (item, index) => index.toString();

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
                centerComponent={{ text: "HISTORY", style: { color: "white" } }}
                rightComponent={
                    <Icon
                        type="material"
                        name="person"
                        color="white"
                        onPress={() => {
                            if (AppModel.userModel.isAnonymous) {
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
