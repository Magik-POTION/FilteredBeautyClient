import firestore from "../utils/firestore";
import Product from "../controllers/Product";
import firebase from "../utils/firebase";

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
        let docRef = firestore.collection("favourites").doc(uid);

        let documentSnapshot = await docRef.get();
        let data = documentSnapshot.data();
        let favouritesArray = [];
        if (data) {
            favouritesArray = Object.values(data).map(
                (product) => new Product(product)
            );
        }

        return favouritesArray;
    }

    /**
     * Adds a product to the user's favourites.
     * @param {String} uid
     * @param {Product} product
     */
    static async addFavourite(uid, product) {
        // Gets the user's document
        let documentRef = firestore.collection("favourites").doc(uid);

        // Create payload
        let payload = { [product.id]: product.getProperties() };
        documentRef.set(payload, { merge: true });
    }

    /**
     * Remove a product from the user's favourites.
     * @param {String} uid
     * @param {Product} product
     */
    static async removeFavourite(uid, product) {
        let documentRef = firestore.collection("favourites").doc(uid);

        let payload = { [product.id]: firebase.firestore.FieldValue.delete() };

        await documentRef.update(payload);
    }

    /**
     * Fetches user's history and returns it
     * @param {String} uid
     * @returns array of history elements.
     */
    static async getHistory(uid) {
        let docRef = firestore.collection("history").doc(uid);

        let documentSnapshot = await docRef.get();
        let data = documentSnapshot.data();
        let historyArray = [];
        if (data) {
            historyArray = Object.values(data).map(
                (product) => new Product(product)
            );
        }

        return historyArray;
    }

    /**
     * Adds a product to the user's history.
     * @param {String} uid
     * @param {Product} product
     */
    static async addHistory(uid, product) {
        // Gets the user's document
        let documentRef = firestore.collection("history").doc(uid);

        // Create payload
        let payload = { [product.id]: product.getProperties() };
        documentRef.set(payload, { merge: true });
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
