import { BehaviorSubject } from "rxjs";

/**
 * A class that stores firebase user information, contains no logic.
 * Properties use the observable pattern for easy view updates.
 * UserController should be used to manage the instances of this class.
 */
export default class UserModel {
    constructor() {
        this.uid = new BehaviorSubject("");
        this.photoURL = new BehaviorSubject("");
        this.isAnonymous = new BehaviorSubject(true);
        this.displayName = new BehaviorSubject("");
        this.email = new BehaviorSubject("");
    }
}
