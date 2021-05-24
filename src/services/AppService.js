import { BehaviorSubject, merge } from "rxjs";
import UserModel from "../models/UserModel";
import ProductsModel from "../models/ProductsModel";
import SkinProfileModel from "../models/SkinProfileModel";
import ProductDetailModel from "../models/ProductDetailModel";
import UserController from "../controllers/UserController";
import FavouritesController from "../controllers/FavouritesController";
import HistoryController from "../controllers/HistoryController";
import SkinProfileController from "../controllers/SkinProfileController";
import SearchController from "../controllers/SearchController";
import ProductDetailController from "../controllers/ProductDetailController";

class AppService {
    static instance = new AppService();

    constructor() {
        /**
         * State that represents the app's state.
         * Useful to disable buttons when handling asynchronous tasks.
         */
        this.isLoading = new BehaviorSubject(false);

        // Models
        this.userModel = new UserModel();
        this.favouritesModel = new ProductsModel();
        this.historyModel = new ProductsModel();
        this.searchModel = new ProductsModel();
        this.skinProfileModel = new SkinProfileModel();
        this.productDetailModel = new ProductDetailModel();

        // Controllers
        this.userController = new UserController(this.userModel);
        this.favouritesController = new FavouritesController(
            this.favouritesModel
        );
        this.historyController = new HistoryController(this.historyModel);
        this.skinProfileController = new SkinProfileController(
            this.skinProfileModel
        );
        this.searchController = new SearchController(
            this.searchModel,
            this.skinProfileModel
        );
        this.productDetailController = new ProductDetailController(
            this.productDetailModel
        );
    }

    async load() {
        await this.userController.load();
        await this.favouritesController.load(this.userModel.uid.getValue());
        await this.historyController.load(this.userModel.uid.getValue());
        await this.skinProfileController.load(this.userModel.uid.getValue());
        await this.searchController.load();

        this.skinProfileModel.Dairy_Free.subscribe(() =>
            this.searchController.search()
        );
        this.skinProfileModel.Gluten_Free.subscribe(() =>
            this.searchController.search()
        );
        this.skinProfileModel.Hypoallergenic.subscribe(() =>
            this.searchController.search()
        );
        this.skinProfileModel.Peanut_Free_Product.subscribe(() =>
            this.searchController.search()
        );
        this.skinProfileModel.Sugar_Free.subscribe(() =>
            this.searchController.search()
        );
        this.skinProfileModel.alcohol_free.subscribe(() =>
            this.searchController.search()
        );
        this.skinProfileModel.oil_free.subscribe(() =>
            this.searchController.search()
        );
        this.skinProfileModel.silicone_free.subscribe(() =>
            this.searchController.search()
        );

        merge(
            this.skinProfileModel.Dairy_Free,
            this.skinProfileModel.Gluten_Free,
            this.skinProfileModel.Hypoallergenic,
            this.skinProfileModel.Peanut_Free_Product,
            this.skinProfileModel.Sugar_Free,
            this.skinProfileModel.alcohol_free,
            this.skinProfileModel.oil_free,
            this.skinProfileModel.silicone_free
        ).subscribe((value) => {
            this.skinProfileController.updateSkinCareProfile(
                this.userModel.uid.getValue(),
                this.skinProfileController.getProperties()
            );
        });
    }
}

export default AppService.instance;
