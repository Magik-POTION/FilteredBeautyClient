import ProductsModel from "../models/ProductsModel";
import makeupApiService from "../services/makeupApiService";
import Product from "../controllers/Product";
import filter from "../utils/filter";

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
        let processedList =  this.processProducts(this.allProducts)
        this.searchModel.products.next(processedList);
    }

    /**
     * Searches for product by name
     * @param {String} name product name.
     */
    search(name) {
        if (name.length > 0) {
            let filteredList = this.allProducts.filter((product) =>
                product.name.includes(name)
            );
            this.searchModel.products.next(filteredList);
        } else {
            this.searchModel.products.next(this.processProducts(this.allProducts));
        }
    }

    /**
     * Filteres out products based on skin profile.
     * @param {Array} products array of products.
     */
    processProducts(products) {
        // TODO: Filter Products Here

        return products;
    }
}
