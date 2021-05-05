import AppModel from "../models/AppModel";
import UserController from "../controllers/UserController";
import FavouritesController from "./FavouritesController";
import HistoryController from "./HistoryController";
import SkinProfileController from "./SkinProfileController";
import SearchController from "./SearchController";
import ProductDetailController from "./ProductDetailController";

/**
 * A Controller that contains the logic to manage the app model.
 * Implemented as a globally accessible singleton object.
 */
class AppController {
    static instance = new AppController();

    constructor() {
        // Various controllers below.
        this.userController = new UserController(AppModel.userModel);
        this.favouritesController = new FavouritesController(
            AppModel.favouritesModel
        );
        this.historyController = new HistoryController(AppModel.historyModel);
        this.skinProfileController = new SkinProfileController(
            AppModel.skinProfileModel
        );
        this.searchController = new SearchController(AppModel.searchModel);
        this.productDetailController = new ProductDetailController(
            AppModel.productDetailModel
        );
    }

    // Loads app assets.
    async load() {
        await this.userController.load();
        await this.favouritesController.load(AppModel.userModel.uid.getValue());
        await this.historyController.load(AppModel.userModel.uid.getValue());
        await this.skinProfileController.load(
            AppModel.userModel.uid.getValue()
        );
        await this.searchController.load();

        AppModel.skinProfileModel.Dairy_Free.subscribe(() => this.searchController.search())
        AppModel.skinProfileModel.Gluten_Free.subscribe(() => this.searchController.search())
        AppModel.skinProfileModel.Hypoallergenic.subscribe(() => this.searchController.search())
        AppModel.skinProfileModel.Peanut_Free_Product.subscribe(() => this.searchController.search())
        AppModel.skinProfileModel.Sugar_Free.subscribe(() => this.searchController.search())
        AppModel.skinProfileModel.alcohol_free.subscribe(() => this.searchController.search())
        AppModel.skinProfileModel.oil_free.subscribe(() => this.searchController.search())
        AppModel.skinProfileModel.silicone_free.subscribe(() => this.searchController.search())
    }
}

export default AppController.instance;
