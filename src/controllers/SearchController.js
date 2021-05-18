import ProductsModel from "../models/ProductsModel";
import makeupApiService from "../services/makeupApiService";
import Product from "../controllers/Product";
import SkinProfileHandler from "../utils/SkinProfileHandler";

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
        let processedList = this.processProducts(this.allProducts);
        this.searchModel.products.next(processedList);
    }

    /**
     * Searches for product
     * @param {String} value value to search for.
     */
    search(value) {
        if (value && value.length > 0) {
            let parsedValue = value.toLowerCase();

            let filteredList = this.allProducts.filter(
                (product) =>
                    product.name.toLowerCase().includes(parsedValue) ||
                    (product.brand &&
                        product.brand.toLowerCase().includes(parsedValue))
            );
            filteredList = this.processProducts(filteredList);
            this.searchModel.products.next(filteredList);
        } else {
            this.searchModel.products.next(
                this.processProducts(this.allProducts)
            );
        }
    }

    /**
     * Filteres out products based on skin profile.
     * @param {Array} products array of products.
     */
    processProducts(products) {
        return SkinProfileHandler.filter(products);
    }
}
