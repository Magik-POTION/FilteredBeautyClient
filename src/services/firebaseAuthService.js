import firebase from "../utils/firebase";

/**
 * A Service Class that handles:
 * user authentication & displayName changes
 */
export default class FirebaseService {
    /**
     * Creates a temporary account for the user.
     * @returns a firebase user object
     */
    static signInAnonymously = async () => {
        // Generates credentials for anonymous account.
        const userCredentials = await firebase.auth().signInAnonymously();
        // Gets user properties
        const user = userCredentials.user;
        return user;
    };

    /**
     * Creates a new firebase account.
     * @param {String} email to be used for new account
     * @param {String} password to be used for new account
     * @returns a firebase user object
     */
    static signUp = async (email, password) => {
        // Checkes if email is valid, otherwise throws an error
        await firebase.auth().fetchSignInMethodsForEmail(email);

        // Creates credentials for firebase account
        const credential = await firebase.auth.EmailAuthProvider.credential(
            email,
            password
        );

        // Converts anonyous account to full account.
        const usercred = await firebase
            .auth()
            .currentUser.linkWithCredential(credential);

        // Gets firebase user object
        const user = usercred.user;

        return user;
    };

    /**
     * Signs out a user.
     */
    static signOut = async () => {
        await firebase.auth().signOut();
    };

    /**
     *  Signs in an exsisting firebase user.
     * @param {String} email to log in
     * @param {String} password to log in
     * @returns
     */
    static signIn = async (email, password) => {
        // Authenticates user
        const usercred = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password);

        // Gets firebase user object
        const user = usercred.user;

        return user;
    };

    /**
     * Updates the user's display name.
     * In the future this can be updated to update firebase' user photoURL.
     * @param {String} displayName the new display name to be set
     */
    static updateUser = async (displayName) => {
        const user = await this.getCurrentUser();
        await user.updateProfile({
            displayName: displayName,
        });
    };

    /**
     * Gets the currently logged in user.
     * @returns firebase user object.
     */
    static getCurrentUser = async () => {
        // Asynchronously gets the current user.
        return new Promise((resolve, reject) => {
            const unsubscribe = firebase.auth().onAuthStateChanged(
                (user) => {
                    if (user) {
                        resolve(user);
                    } else {
                        reject(new Error("User Doexsn't Exist"));
                    }
                    unsubscribe();
                },
                (error) => {
                    reject(error);
                    unsubscribe();
                }
            );
        });
    };

    /**
     * Gets a user IdToken from firebase to use API.
     * @returns IdToken
     */
    static getIdToken = async () => {
        const user = await this.getCurrentUser();
        const IdToken = await user.getIdToken();
        return IdToken;
    };
}
