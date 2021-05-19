import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Image, Button, Icon, ListItem } from "react-native-elements";
import useObservable from "../utils/useObservable";
import AppModel from "../models/AppModel";
import { Dimensions, Linking } from "react-native";
import AppController from "../controllers/AppController";
import { ScrollView } from "react-native";
import colours from "../../config/colours";

/**
 * Shows the detail of a product
 */
export default function DetailsScreen() {
    const product = useObservable(AppModel.productDetailModel.selectedProduct);
    const [favourited, setFavourited] = React.useState(false);

    React.useEffect(() => {
        const favouritesSubscription =
            AppModel.favouritesModel.products.subscribe((products) => {
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
            

            <View style={styles.topInfoContainer}>
                <Text>Brand: {product.brand}</Text>
                <Text>Category: {product.category}</Text>
            </View>

            <View style={styles.topInfoContainer}>
                <Text>Type: {product.product_type}</Text>
            </View>

            <View style={{flex: 0.5}}>
                <Text>Description:</Text>
                <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
                    <Text>{product.description}</Text>
                </ScrollView>
            </View>
            <View style={styles.tagContainer}>
                <Text>Tags: {product.tag_list}</Text>
            </View>
            <Button
                containerStyle={{
                    margin: 16,
                    justifyContent: "flex-end",
                    
                }}
                buttonStyle={{
                    backgroundColor: colours.accent
                }}
                title={"PURCHASE"}
                onPress={handleBuyButton}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    topInfoContainer: {
        flex: 0.2, 
        flexDirection: "row", 
        justifyContent: "space-evenly"
    },
    tagContainer: {
        flex: 0.2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
});

