import firebase from "firebase";
import "firebase/firestore";
import Constants from "expo-constants";

// Firebase Initialization
let firebaseConfig = {
    apiKey: Constants.manifest.extra.apiKey,
    authDomain: Constants.manifest.extra.authDomain,
    projectId: Constants.manifest.extra.projectId,
    storageBucket: Constants.manifest.extra.storageBucket,
    messagingSenderId: Constants.manifest.extra.messagingSenderId,
    appId: Constants.manifest.extra.appId,
};

firebase.initializeApp(firebaseConfig);

export default firebase;
