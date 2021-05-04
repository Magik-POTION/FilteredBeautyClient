import AppModel from "../models/AppModel";
import UserController from "../controllers/UserController";
import FavouritesController from "./FavouritesController";
import HistoryController from "./HistoryController";
import SkinProfileController from "./SkinProfileController";

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
    }

    // Loads app assets.
    async load() {
        await this.userController.load();
        await this.favouritesController.load(
            AppModel.userModel.uid.getValue()
        );
        await this.historyController.load(
            AppModel.userModel.uid.getValue()
        );
        await this.skinProfileController.load(
            AppModel.userModel.uid.getValue()
        );
    }
}

export default AppController.instance;
