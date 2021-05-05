import React from "react";
import { View } from "react-native";
import { Text, Image, Button, Icon, ListItem } from "react-native-elements";
import useObservable from "../utils/useObservable";
import AppModel from "../models/AppModel";
import { Dimensions } from "react-native";
import AppController from "../controllers/AppController";

/**
 * Shows the detail of a product
 */
export default function DetailsScreen() {
    const product = useObservable(AppModel.productDetailModel.selectedProduct);
    const [favourited, setFavourited] = React.useState(false);

    React.useEffect(() => {
        const favouritesSubscription = AppModel.favouritesModel.products.subscribe(
            (products) => {
                let found = products.find(
                    (favouritedProduct) => product.id == favouritedProduct.id
                );
                if (found) {
                    setFavourited(true);
                } else {
                    setFavourited(false);
                }
            }
        );

        return () => favouritesSubscription.unsubscribe();
    }, []);

    function handleBuyButton() {
        // TODO: Search for product on amazon
    }

    async function handleFavouriteOnPress() {
        if (favourited) {
            await AppController.favouritesController.removeProduct(
                AppModel.userModel.uid.getValue(),
                product
            );
        } else {
            await AppController.favouritesController.addProduct(
                AppModel.userModel.uid.getValue(),
                product
            );
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <Image
                style={{
                    height: Dimensions.get("window").height * 0.3,
                }}
                source={{ uri: product.image_link }}
            />
            <ListItem>
                <ListItem.Content>
                    <Text h4>{product.name}</Text>
                </ListItem.Content>
                <Icon
                    type="material"
                    name={favourited ? "favorite" : "favorite-outline"}
                    onPress={handleFavouriteOnPress}
                />
            </ListItem>
            <Text>Brand: {product.brand}</Text>
            <Text>Category: {product.category}</Text>
            <Text>Type: {product.product_type}</Text>
            <Text>Tags: {product.tag_list}</Text>
            <Text>Description: {product.description}</Text>
            <Button
                containerStyle={{
                    margin: 16,
                    flex: 1,
                    justifyContent: "flex-end",
                }}
                title={"PURCHASE"}
                onPress={handleBuyButton}
            />
        </View>
    );
}
