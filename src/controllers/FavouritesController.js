import ProductsModel from "../models/ProductsModel";
import Product from "../controllers/Product";
import firebaseFirestoreService from "../services/firebaseFirestoreService";
import db from "../utils/firestore"; 

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
     * @param {Number} uid
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
     * @param {Number} uid
     * @param {Product} product
     */
    async addProduct(uid, product) {
        // adds product to firestore
        await firebaseFirestoreService.addFavourite(uid, product);

        // adds product to list locallly
        let productList = [product].concat(
            this.favouritesModel.products.getValue()
        );
         // publish the new list of products
        this.favouritesModel.products.next(productList)

        // ??? adding to firestore under uid 
        return firestore.collection('users').uid.set({
            favourites: this.favouritesModel.products.getValue(), 
            favourites: this.favouritesModel.products.next(productList) 
        });
        // ???
    }

    /**
     * Takes in a product and removes it from favourites.
     * @param {Number} uid firebase uid.
     * @param {Product} product to be added to favourites.
     */
    async removeProduct(uid, product) {
        // removes product from firestore
        await firebaseFirestoreService.removeFavourite(uid, product);
        let oldList = this.favouritesModel.products.getValue();
        let filteredList = oldList.filter(
            (element) => product.id != element.id
        );

        // Updates model with removed product.
        this.favouritesModel.products.next(filteredList);
    }

    reset() {
        this.favouritesModel.products.next([]);
    }
}
