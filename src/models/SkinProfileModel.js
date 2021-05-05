import { BehaviorSubject } from "rxjs";

export default class SkinProfileModel {
    constructor() {
        this.Hypoallergenic = new BehaviorSubject(false);
        this.Dairy_Free = new BehaviorSubject(false);
        this.Gluten_Free = new BehaviorSubject(false);
        this.Peanut_Free_Product = new BehaviorSubject(false);
        this.Sugar_Free = new BehaviorSubject(false);
        this.alcohol_free = new BehaviorSubject(false);
        this.oil_free = new BehaviorSubject(false);
        this.silicone_free = new BehaviorSubject(false);
    }
}
