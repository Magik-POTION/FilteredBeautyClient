import ProductsModel from "../models/ProductsModel";
import Product from "../controllers/Product";
import firebaseFirestoreService from "../services/firebaseFirestoreService";

/**
 * Manages a ProductsModel as a collection of products of the user's history.
 */
export default class FavouritesController {
    /**
     *
     * @param {ProductsModel} historyModel represents the user's product history.
     */
    constructor(productsModel) {
        this.productsModel = productsModel;
    }

    /**
     * Fetches history from database and updates the model.
     */
    async load() {
        // TODO: call firestore service and converts data to object instances
        // and stores them in the model.
    }

    /**
     * Takes in a product and adds them to favourites.
     * @param {Product} product
     */
    async addProduct(product) {
        // adds product to list locallly
        let productList = this.productsModel.products.getValue().push(product);
        // publish the new list of products
        this.productsModel.products.next(productList);

        // adds product to firestore
        await firebaseFirestoreService.addHistory(product);
    }
}
