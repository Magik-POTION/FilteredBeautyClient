import firestore from "../utils/firestore";
import Product from "../controllers/Product";

/**
 * Handles calls to firebase firestore database.
 */
export default class firebaseFirestoreService {
    /**
     * fetches all current user's favourites.
     */
    static async getFavourites() {
        //TODO: implement firestore logic
    }

    /**
     * Adds a product to the user's favourites.
     * @param {Product} product
     */
    static async addFavourite(product) {
        // TODO: implement firestore logic
    }

    /**
     * Remove a product from the user's favourites.
     * @param {Product} product
     */
    static async removeFavourite(product) {
        // TODO: implement firestore logic.
    }

    /**
     * Fetches user's history and returns it
     */
    static async getHistory() {
        // TODO: implement firestore logic.
    }

    /**
     * Adds a product to the user's history.
     */
    static async addHistory(product) {
        // TODO: implement firestore logic.
    }

    /**
     * Fetches the uer's skin profile.
     */
    static async getSkinProfile() {
        // TODOL: implement firestore logic.
    }
}
