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
        <View style={{ flex: 1, backgroundColor: colours.secondary }}>
            <View style={{ backgroundColor: colours.background, }}>

                {/* Product Image View */}
                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Image
                        style={{
                            height: Dimensions.get("window").height * 0.25,
                            width: Dimensions.get("window").height * 0.25,
                            overflow: 'hidden',
                            borderRadius: 100,
                            borderColor: colours.accent,
                            borderWidth: 3,
                        }}
                        source={{ uri: product.image_link }}
                    />
                </View>

                <ListItem style={{}}>
                    <ListItem.Content style={{ backgroundColor: colours.secondary, padding: 15, borderRadius: 15, alignItems: 'center' }}>
                        <Text style={{ fontWeight: '900', color: colours.background, textAlign: 'center' }} h4>{product.name}</Text>
                        <Icon
                            type="material"
                            name={favourited ? "favorite" : "favorite-outline"}
                            onPress={handleFavouriteOnPress}
                            color={colours.primary}
                            style={{ marginTop: 10 }}
                        />
                    </ListItem.Content>

                </ListItem>
            </View>
            <View style={styles.topInfoContainer}>
                <Text style={{ color: colours.accent, fontWeight: '700', marginRight: 10, fontSize: 12, marginBottom: 3 }}>Brand: {product.brand}</Text>
                <Text style={{ color: colours.accent, fontWeight: '700', marginRight: 10, fontSize: 12, marginBottom: 3 }}>Category: {product.category}</Text>
                <Text style={{ color: colours.accent, fontWeight: '700', marginRight: 10, fontSize: 12, marginBottom: 3 }}>Type: {product.product_type}</Text>
            </View>

            <View style={{ flex: 1, borderBottomColor: colours.accent, borderBottomWidth: 3, }}>
                <ScrollView style={{ flex: 1, backgroundColor: colours.secondary, paddingTop: 20, paddingLeft: 10, paddingRight: 10, }}>
                    <Text style={{ color: colours.accent, fontWeight: 'bold', fontSize: 17, marginBottom: 10, marginLeft: 5 }}>Description:</Text>
                    <Text style={{ fontWeight: '500', fontSize: 13, color: colours.background, lineHeight: 22, paddingLeft: 5, paddingRight: 5, }}>{product.description}</Text>
                </ScrollView>
            </View>
            <View style={styles.tagContainer}>
                <Text style={{ color: colours.background, fontWeight: '500' }}>Tags: {product.tag_list}</Text>
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
                    padding: 10,
                }}
                title={"PURCHASE"}
                onPress={handleBuyButton}
            />
        </View >
    );
}
// Margin & Padding fixed
const styles = StyleSheet.create({
    topInfoContainer: {
        flex: 0.15,
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: colours.secondary,
        padding: 20,
        borderBottomColor: colours.accent,
        borderBottomWidth: 3,
        flexWrap: 'wrap',
    },
    tagContainer: {
        backgroundColor: colours.primary,
        flex: 0.15,
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: 10,
        alignItems: "flex-end",
        borderRadius: 50,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
    },
});

