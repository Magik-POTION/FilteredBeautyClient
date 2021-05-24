import firestore from "../utils/firestore";
import Product from "../controllers/Product";

/**
 * Handles calls to firebase firestore database.
 */
export default class firebaseFirestoreService {
    /**
     * Fetches favourite products based on uid.
     * @param {String} uid
     * @returns array of favourite products.
     */
    static async getFavourites(uid) {
        let collectionRef = firestore
            .collection("favourites")
            .doc(uid)
            .collection("products");
        let querySnapshot = await collectionRef.get();
        let favouritesArray = querySnapshot.docs.map((doc) => doc.data());
        return favouritesArray;
    }

    /**
     * Adds a product to the user's favourites.
     * @param {String} uid
     * @param {Product} product
     */
    static async addFavourite(uid, product) {
        let documentRef = firestore
            .collection("favourites")
            .doc(uid)
            .collection("products")
            .doc(product.id);
        await documentRef.set(product);
    }

    /**
     * Remove a product from the user's favourites.
     * @param {String} uid
     * @param {Product} product
     */
    static async removeFavourite(uid, product) {
        let documentRef = firestore
            .collection("favourites")
            .doc(uid)
            .collection("products")
            .doc(product.id);
        await documentRef.delete();
    }

    /**
     * Fetches user's history and returns it
     * @param {String} uid
     * @returns array of history elements.
     */
    static async getHistory(uid) {
        let collectionRef = firestore
            .collection("history")
            .doc(uid)
            .collection("products");

        let querySnapshot = await collectionRef.get();
        return querySnapshot.docs.map((doc) => doc.data());
    }

    /**
     * Adds a product to the user's history.
     * @param {String} uid
     * @param {Product} product
     */
    static async addHistory(uid, product) {
        let ref = firestore
            .collection("history")
            .doc(uid)
            .collection("products")
            .doc(product);
        await ref.set(product.getProperties());
    }

    /**
     * Fetches the user's skin profile.
     * @param {String} uid
     * @returns an object containing the user's skin profile.
     */
    static async getSkinProfile(uid) {
        let docRef = firestore.collection("skinprofile").doc(uid);
        let documentSnapshot = await docRef.get();
        return documentSnapshot.data();
    }

    /**
     * Updates user's skin profile.
     * @param {String} uid
     * @param {*} skinProfile on object containing skin profile data.
     */
    static async updateSkinProfile(uid, skinProfile) {
        let docRef = firestore.collection("skinprofile").doc(uid);
        await docRef.set(skinProfile);
    }
}
