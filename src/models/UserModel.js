import { BehaviorSubject } from "rxjs";

export default class UserModel {
    constructor() {
        this.uid = new BehaviorSubject("");
        this.photoURL = new BehaviorSubject("");
        this.isAnonymous = new BehaviorSubject(true);
        this.displayName = new BehaviorSubject("");
    }
}
