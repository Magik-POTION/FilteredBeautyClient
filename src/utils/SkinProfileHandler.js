/**
 * Filtering Logic
 */
export default class SkinProfileHandler {
    /**
     * Filters out products given skin profile
     * @param {Array} products
     * @param {Object} skinProfile
     */
    static filter(products, skinProfileModel) {
        let result = products;

        if (skinProfileModel.Dairy_Free.getValue())
            result = products.filter((product) =>
                product.tag_list.includes("Dairy Free")
            );
        if (skinProfileModel.Gluten_Free.getValue())
            result = result.filter((product) =>
                product.tag_list.includes("Gluten Free")
            );
        if (skinProfileModel.Hypoallergenic.getValue())
            result = result.filter((product) =>
                product.tag_list.includes("Hypoallergenic")
            );
        if (skinProfileModel.Peanut_Free_Product.getValue())
            result = result.filter((product) =>
                product.tag_list.includes("Peanut Free Product")
            );
        if (skinProfileModel.Sugar_Free.getValue())
            result = result.filter((product) =>
                product.tag_list.includes("Sugar Free")
            );
        if (skinProfileModel.alcohol_free.getValue())
            result = result.filter((product) =>
                product.tag_list.includes("alcohol free")
            );
        if (skinProfileModel.oil_free.getValue())
            result = result.filter((product) =>
                product.tag_list.includes("oil free")
            );
        if (skinProfileModel.silicone_free.getValue())
            result.filter((product) =>
                product.tag_list.includes("silicone free")
            );

        return result;
    }
}
