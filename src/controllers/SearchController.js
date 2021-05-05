import ProductsModel from "../models/ProductsModel";

export default class SearchController {
    /**
     *
     * @param {ProductsModel} searchModel Takes in a product model to manage the search feature.
     */
    constructor(searchModel) {
        this.searchModel = searchModel;
    }

    /**
     * fetches all products and saves them in the searchModel.
     */
    async load() {
        // TODO
    }

    /**
     * Searches for product by name
     * @param {String} value product name.
     */
    search(value) {
        // TODO: Filter searchModel
    }
}
