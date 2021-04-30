import ProductsModel from "../models/ProductsModel";
import Product from "../controllers/Product";
import firebaseFirestoreService from "../services/firebaseFirestoreService";

/**
 * Manages a ProductsModel as a collection of favourite products.
 */
export default class FavouritesController {
    /**
     * Constructor.
     * @param {ProductsModel} favouritesModel represents the user's favourite products.
     */
    constructor(favouritesModel) {
        this.favouritesModel = favouritesModel;
    }

    /**
     * Fetches favourites from database and updates the model.
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
        let productList = this.favouritesModel.products.getValue().push(product);
        // publish the new list of products
        this.favouritesModel.products.next(productList);

        // adds product to firestore
        await firebaseFirestoreService.addFavourite(product);
    }

    /**
     * Takes in a product and removes it from favourites.
     * @param {Product} product
     */
    async removeProduct(product) {
        let productList = this.favouritesModel.getValue();

        // TODO: Doesn't work until product schema is done.
        let filteredList = productList.filter(
            (element) => product.id != element.id
        );

        // Updates model with removed product.
        this.favouritesModel.products.next(filteredList);

        // removes product from firestore
        await firebaseFirestoreService.removeFavourite(product);
    }
}
