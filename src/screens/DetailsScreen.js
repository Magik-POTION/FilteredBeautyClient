import React from "react";
import { Text } from "react-native-elements";

/**
 * Shows the detail of a product
 * @param {*} param0 navigation params, holds product item
 */
export default function DetailsScreen({ params }) {
    const item = params.item;

    // TODO: Add Ingredients, Instructions, Description and Name

    return (
        <View style={{ flex: 1 }}>
            <Text>{item.id}</Text>
        </View>
    );
}
