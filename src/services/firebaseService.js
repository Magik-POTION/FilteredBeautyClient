import firebase from "../utils/firebase";

export default class FirebaseService {
    static signInAnonymously = async () => {
        const userCredentials = await firebase.auth().signInAnonymously();
        const user = userCredentials.user;
        return user;
    };

    static signUp = async (email, password) => {
        await firebase.auth().fetchSignInMethodsForEmail(email);

        const credential = await firebase.auth.EmailAuthProvider.credential(
            email,
            password
        );

        const usercred = await firebase
            .auth()
            .currentUser.linkWithCredential(credential);
        const user = usercred.user;
        return user;
    };

    static signOut = async () => {
        await firebase.auth().signOut();
    };

    static signIn = async (email, password) => {
        const usercred = await firebase
            .auth()
            .signInWithEmailAndPassword(email, password);
        const user = usercred.user;
        return user;
    };
}
