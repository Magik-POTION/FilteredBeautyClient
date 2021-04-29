import UserModel from "../models/UserModel";

/**
 * Controller class that handles logic for UserModel.
 */
export default class UserController {
    /**
     *
     * @param {UserModel} userModel, reference to the user model being handled.
     */
    constructor(userModel) {
        this.userModel = userModel;
    }

    // Loads user information.
    async load() {
        // TODO: Implement user loading functionality
    }
}
