import AppService from "../services/AppServiceÎ";

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

        if (AppService.skinProfileModel.Dairy_Free.getValue())
            result = products.filter((product) =>
                product.tag_list.includes("Dairy Free")
            );
        if (AppService.skinProfileModel.Gluten_Free.getValue())
            result = result.filter((product) =>
                product.tag_list.includes("Gluten Free")
            );
        if (AppService.skinProfileModel.Hypoallergenic.getValue())
            result = result.filter((product) =>
                product.tag_list.includes("Hypoallergenic")
            );
        if (AppService.skinProfileModel.Peanut_Free_Product.getValue())
            result = result.filter((product) =>
                product.tag_list.includes("Peanut Free Product")
            );
        if (AppService.skinProfileModel.Sugar_Free.getValue())
            result = result.filter((product) =>
                product.tag_list.includes("Sugar Free")
            );
        if (AppService.skinProfileModel.alcohol_free.getValue())
            result = result.filter((product) =>
                product.tag_list.includes("alcohol free")
            );
        if (AppService.skinProfileModel.oil_free.getValue())
            result = result.filter((product) =>
                product.tag_list.includes("oil free")
            );
        if (AppService.skinProfileModel.silicone_free.getValue())
            result.filter((product) => product.tag_list.includes("silicone free"));

        return result;
    }
}
