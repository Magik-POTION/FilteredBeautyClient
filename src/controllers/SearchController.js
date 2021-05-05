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
        this.allProducts = [];
    }

    /**
     * Fetches all products and saves them in the searchModel.
     */
    async load() {
        let data = await makeupApiService.getAllProducts();
        this.allProducts = data.map((product) => new Product(product));
        // TODO: Filter Products
        this.searchModel.products.next(this.allProducts);
    }

    /**
     * Searches for product by name
     * @param {String} name product name.
     */
    async search(name) {
        // let parsedData = data.map((product) => new Product(product));
        // let filteredList = parsedData.filter((product) =>
        //     product.name.includes(value)
        // );
        // this.searchModel.products.next(filteredList);
    }
}
