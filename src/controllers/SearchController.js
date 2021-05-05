import ProductsModel from "../models/ProductsModel";
import makeupApiService from "../services/makeupApiService";
import Product from "../controllers/Product";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class SearchController {
    /**
     *
     * @param {ProductsModel} searchModel Takes in a product model to manage the search feature.
     */
    constructor(searchModel) {
        this.searchModel = searchModel;
    }

    /**
     * Fetches all products and saves them in the searchModel.
     */
    async load() {
        let data = await makeupApiService.getAllProducts();
        let parsedData = data.map((product) => new Product(product));
        this.searchModel.products.next(parsedData);
    }

    /**
     * Searches for product by name
     * @param {String} value product name.
     */
    search(value) {
        // TODO: Filter searchModel
    }
}
