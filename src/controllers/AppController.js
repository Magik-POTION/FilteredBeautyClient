import AppModel from "../models/AppModel";
import UserController from "../controllers/UserController";

/**
 * A Controller that contains the logic to manage the app model.
 * Implemented as a globally accessible singleton object.
 */
class AppController {
    static instance = new AppController();

    constructor() {
        // Various controllers below.
        this.userController = new UserController(AppModel.userModel);
    }

    // Loads app assets.
    async load() {
        await this.userController.load();
    }
}

export default AppController.instance;
