/**
 * Represents a product.
 */
export default class Product {
    /**
     *
     * @param {*} product, a product element from a database.
     */
    constructor(product) {
        // set needed properties here.
        this.id = product.id;
    }

    getProperties() {
        return {
            id: this.id,
        };
    }
}
