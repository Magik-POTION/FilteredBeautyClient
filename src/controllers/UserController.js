import UserModel from "../models/UserModel";
import firebaseAuthService from "../services/firebaseAuthService";

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

    /**
     * Loads user information.
     */
    async load() {
        try {
            // Determine the current firebase user.
            const currentUser = await firebaseAuthService.getCurrentUser();
            // If user is found, updates the UserModel with the data.
            this.setUserProperties(currentUser);
        } catch (error) {
            // Catches no account error and creates anonymous account.
            const anonymousUser = await firebaseAuthService.signInAnonymously();
            this.setUserProperties(anonymousUser);
        }
    }

    /**
     * Updates the displayName in firebase.
     * @param {String} displayName
     */
    async setDisplayName(displayName) {
        // Removes whitespace
        let trimmedDisplayName = displayName.trim();
        // If the string is empty throw an error
        if (!trimmedDisplayName) throw new Error("DISPLAY NAME CAN'T BE EMPTY");
        // Updates user and waits for response.
        await firebaseAuthService.updateUser(trimmedDisplayName);
        // Updates local model with new displayName.
        this.userModel.displayName.next(trimmedDisplayName);
    }

    /**
     * Signs in a user with an existing account and updates UserModel.
     * @param {String} email
     * @param {String} password
     */
    async signIn(email, password) {
        // Removes whitespace from email.
        let trimmedEmail = email.trim();

        // Attempt to sign in user
        let user = await firebaseAuthService.signIn(trimmedEmail, password);

        // If user is found, updates the UserModel with the data.
        this.setUserProperties(user);
    }

    /**
     * Signs ups a new user.
     * @param {String} email
     * @param {String} password
     */
    async signUp(email, password) {
        // Removes whitespace from email.
        let trimmedEmail = email.trim();

        // Attempt to sign in user
        let user = await firebaseAuthService.signUp(trimmedEmail, password);

        // If user is found, updates the UserModel with the data.
        this.setUserProperties(user);
    }

    /**
     * Signs out the current user and signs them in with an anonymous account.
     */
    async signOut() {
        await firebaseAuthService.signOut();
        let anonymousUser = await firebaseAuthService.signInAnonymously();
        this.setUserProperties(anonymousUser);
    }

    /**
     * Takes in a firebase user object and sets the usermodel properties.
     * @param {*} firebaseUser
     */
    setUserProperties(firebaseUser) {
        this.userModel.uid.next(firebaseUser.uid);
        this.userModel.isAnonymous.next(firebaseUser.isAnonymous);
        firebaseUser.displayName != null &&
            this.userModel.displayName.next(firebaseUser.displayName);
        firebaseUser.photoURL != null &&
            this.userModel.photoURL.next(firebaseUser.photoURL);
        this.userModel.email.next(firebaseUser.email)
    }

    /**
     * Resets password for given email.
     * @param {String} email
     */
    async sendEmailPasswordReset(email) {
        firebaseAuthService.resetPassword(email);
    }
}
