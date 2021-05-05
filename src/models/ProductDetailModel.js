import { BehaviorSubject } from "rxjs";

/**
 * Holds the currently selected product.
 */
export default class ProductDetailModel {
    constructor() {
        this.selectedProduct = new BehaviorSubject(null);
    }
}
