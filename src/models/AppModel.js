import UserModel from "../models/UserModel";
import ProductsModel from "../models/ProductsModel";
import SkinProfileModel from "../models/SkinProfileModel";
import ProductDetailModel from "../models/ProductDetailModel";
import { BehaviorSubject } from "rxjs";

/**
 * A Model that contains all the data used in the app.
 * Implemented as a globally accessible singleton object.
 */
class AppModel {
    static instance = new AppModel();

    constructor() {
        /**
         * State that represents the app's state.
         * Useful to disable buttons when handling asynchronous tasks.
         */
        this.isLoading = new BehaviorSubject(false);

        // Various model instances below.
        this.userModel = new UserModel();
        this.favouritesModel = new ProductsModel();
        this.historyModel = new ProductsModel();
        this.searchModel = new ProductsModel();
        this.skinProfileModel = new SkinProfileModel();
        this.productDetailModel = new ProductDetailModel();
    }
}

export default AppModel.instance;
