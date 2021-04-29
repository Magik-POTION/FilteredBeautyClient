import UserModel from "../models/UserModel";
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
    }
}

export default AppModel.instance;
