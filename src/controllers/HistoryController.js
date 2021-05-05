import ProductsModel from "../models/ProductsModel";
import Product from "../controllers/Product";
import firebaseFirestoreService from "../services/firebaseFirestoreService";

/**
 * Manages a ProductsModel as a collection of products of the user's history.
 */
export default class HistoryController {
    /**
     *
     * @param {ProductsModel} historyModel represents the user's product history.
     */
    constructor(historyModel) {
        this.historyModel = historyModel;
    }

    /**
     * Fetches history from database and updates the model.
     * @param {String} uid firebase uid.
     */
    async load(uid) {
        let historyData = await firebaseFirestoreService.getHistory(uid);
        let historyParsed = historyData.map((product) => new Product(product));
        this.historyModel.products.next(historyParsed);
    }

    /**
     * Takes in a product and adds them to history.
     * @param {Product} product
     * @param {String} uid firebase uid.
     */
    async addProduct(uid, product) {
        // adds product to firestore
        // await firebaseFirestoreService.addHistory(uid, product);

        // adds product to list locallly
        let productList = [product].concat(
            this.historyModel.products.getValue()
        );

        console.lod(productList);

        // publish the new list of products
        this.historyModel.products.next(productList);
    }

    clear() {
        this.historyModel.products.next([]);
    }
}
