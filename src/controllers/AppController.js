import AppModel from "../models/AppModel";
import UserController from "../controllers/UserController";
import FavouritesController from "./FavouritesController";

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
    }

    // Loads app assets.
    async load() {
        await this.userController.load();
        await this.favouritesController.load();
    }
}

export default AppController.instance;
