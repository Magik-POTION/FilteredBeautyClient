import ProductDetailModel from "../models/ProductDetailModel";
import Product from "./Product";

/**
 * Manages the product detail model.
 */
export default class ProductDetailController {
    /**
     *
     * @param {ProductDetailModel} productDetailModel
     */
    constructor(productDetailModel) {
        this.productDetailModel = productDetailModel;
    }

    /**
     * Selects a product to be shown in the details screen.
     * @param {Product} product to be selected.
     */
    selectItem(product) {
        this.productDetailModel.selectedProduct.next(product);
    }
}
