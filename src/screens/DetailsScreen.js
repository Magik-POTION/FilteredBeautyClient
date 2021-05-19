import React from "react";
import { View } from "react-native";
import { Text, Image, Button, Icon, ListItem } from "react-native-elements";
import useObservable from "../utils/useObservable";
import AppService from "../services/AppService";
import { Dimensions, Linking } from "react-native";
import AppService from "../controllers/AppService";
import { ScrollView } from "react-native";

/**
 * Shows the detail of a product
 */
export default function DetailsScreen() {
    const product = useObservable(
        AppService.productDetailModel.selectedProduct
    );
    const [favourited, setFavourited] = React.useState(false);

    React.useEffect(() => {
        const favouritesSubscription =
            AppService.favouritesModel.products.subscribe((products) => {
                let found = products.find(
                    (favouritedProduct) => product.id == favouritedProduct.id
                );
                if (found) {
                    setFavourited(true);
                } else {
                    setFavourited(false);
                }
            });

        return () => favouritesSubscription.unsubscribe();
    }, []);

    function handleBuyButton() {
        Linking.openURL(
            `https://www.amazon.ca/s?k=${product.name} ${product.brand}&linkCode=ll2&tag=ktruong-20&linkId=74f374a9657ac0e6ebb3489db542e821&language=en_CA&ref_=as_li_ss_tl`
        );
    }

    async function handleFavouriteOnPress() {
        if (favourited) {
            await AppService.favouritesController.removeProduct(
                AppService.userModel.uid.getValue(),
                product
            );
        } else {
            await AppService.favouritesController.addProduct(
                AppService.userModel.uid.getValue(),
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
            <Text>Description:</Text>
            <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
                <Text>{product.description}</Text>
            </ScrollView>
            <Button
                containerStyle={{
                    margin: 16,
                    justifyContent: "flex-end",
                }}
                title={"PURCHASE"}
                onPress={handleBuyButton}
            />
        </View>
    );
}
