import { BehaviorSubject } from "rxjs";

/**
 * A class that stores products, contains no logic.
 * Properties use the observable pattern for easy view updates.
 * ProductsController should be used to manage the instances of this class.
 */
export default class ProductsModel {
    constructor() {
        this.products = new BehaviorSubject([]);
    }
}
