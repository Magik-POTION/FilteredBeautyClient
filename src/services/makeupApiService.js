/**
 * Handles calls to API.
 */
export default class MakeUpApiService {

    /**
     * Fetches product data.
     * @returns An array of all products in api
     */
    static async getAllProducts() {
        let response = await fetch(
            "http://makeup-api.herokuapp.com/api/v1/products.json"
        );
        if (response.ok) {
            let data = await response.json();
            return data;
        }
        throw new Error("Unable to fetch products")
    }
}
