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
     * @param {String} uid
     */
    async load(uid) {
        // Fetch array from firestore.
        let favouritesData = await firebaseFirestoreService.getFavourites(uid);

        // maps data elements to class instances.
        let favouritesParsed = favouritesData.map(
            (product) => new Product(product)
        );

        // publishes data to Observable.
        this.favouritesModel.products.next(favouritesParsed);
    }

    /**
     * Adds a product to the user's favourites.
     * @param {String} uid
     * @param {Product} product
     */
    async addProduct(uid, product) {
        // adds product to firestore
        await firebaseFirestoreService.addFavourite(uid, product);

        // adds product to list locallly
        let productList = this.favouritesModel.products
            .getValue()
            .push(product);
        // publish the new list of products
        this.favouritesModel.products.next(productList);
    }

    /**
     * Takes in a product and removes it from favourites.
     * @param {Product} product to be added to favourites.
     * @param {String} uid firebase uid.
     */
    async removeProduct(uid, product) {
        // removes product from firestore
        await firebaseFirestoreService.removeFavourite(uid, product);

        let productList = this.favouritesModel.getValue();

        let filteredList = productList.filter(
            (element) => product.id != element.id
        );

        // Updates model with removed product.
        this.favouritesModel.products.next(filteredList);
    }
}
