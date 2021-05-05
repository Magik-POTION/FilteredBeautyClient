import AppModel from "../models/AppModel";

/**
 * Filtering Logic
 */
export default class SkinProfileHandler {
    /**
     * Filters out products given skin profile
     * @param {Object} skinProfile
     * @param {Array} products
     */
    static filter(products) {
        let result = products;

        if (AppModel.skinProfileModel.Dairy_Free.getValue())
            result = products.filter((product) =>
                product.tag_list.includes("Dairy Free")
            );
        if (AppModel.skinProfileModel.Gluten_Free.getValue())
            result = result.filter((product) =>
                product.tag_list.includes("Gluten Free")
            );
        if (AppModel.skinProfileModel.Hypoallergenic.getValue())
            result = result.filter((product) =>
                product.tag_list.includes("Hypoallergenic")
            );
        if (AppModel.skinProfileModel.Peanut_Free_Product.getValue())
            result = result.filter((product) =>
                product.tag_list.includes("Peanut Free Product")
            );
        if (AppModel.skinProfileModel.Sugar_Free.getValue())
            result = result.filter((product) =>
                product.tag_list.includes("Sugar Free")
            );
        if (AppModel.skinProfileModel.alcohol_free.getValue())
            result = result.filter((product) =>
                product.tag_list.includes("alcohol free")
            );
        if (AppModel.skinProfileModel.oil_free.getValue())
            result = result.filter((product) =>
                product.tag_list.includes("oil free")
            );
        if (AppModel.skinProfileModel.silicone_free.getValue())
            result.filter((product) => product.tag_list.includes("silicone free"));

        return result;
    }
}
