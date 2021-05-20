import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Image, Button, Icon, ListItem } from "react-native-elements";
import useObservable from "../utils/useObservable";
import AppService from "../services/AppService";
import { Dimensions, Linking } from "react-native";
import colours from "../../config/colours";
import { red } from "ansi-colors";

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
                    <Text style={{ fontWeight: '900', color: colours.primary }} h4>{product.name}</Text>
                </ListItem.Content>
                <Icon
                    type="material"
                    name={favourited ? "favorite" : "favorite-outline"}
                    onPress={handleFavouriteOnPress}
                    color='red'
                />
            </ListItem>


            <View style={styles.topInfoContainer}>
                <Text>Brand: {product.brand}</Text>
                <Text>Category: {product.category}</Text>
            </View>

            <View style={styles.topInfoContainer}>
                <Text>Type: {product.product_type}</Text>
            </View>

            <View style={{ flex: 1, }}>
                <Text style={{ paddingLeft: 10, fontWeight: 'bold', fontSize: 20, marginBottom: 5 }}>Description:</Text>
                <ScrollView style={{ flex: 1, backgroundColor: "white", paddingTop: 20, paddingLeft: 10, paddingRight: 10, }}>
                    <Text style={{ lineHeight: 22, paddingLeft: 5, paddingRight: 5, }}>{product.description}</Text>
                </ScrollView>
            </View>
            <View style={styles.tagContainer}>
                <Text style={{ color: colours.secondary }}>Tags: {product.tag_list}</Text>
            </View>
            <Button
                containerStyle={{
                    margin: 15,
                    justifyContent: "flex-end",
                }}
                buttonStyle={{
                    backgroundColor: colours.accent,
                    borderRadius: 30,
                    marginBottom: 20,
                }}
                title={"PURCHASE"}
                onPress={handleBuyButton}
            />
        </View>
    );
}
// Margin & Padding fixed
const styles = StyleSheet.create({
    topInfoContainer: {
        flex: 0.1,
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginTop: 25
    },
    tagContainer: {
        flex: 0.2,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginLeft: 20,
    },
});
