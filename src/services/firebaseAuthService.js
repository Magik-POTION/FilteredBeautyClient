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
     *
     * @param {String} email
     * @param {String} password
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
     * @param {String} email
     * @param {String} password
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
}
