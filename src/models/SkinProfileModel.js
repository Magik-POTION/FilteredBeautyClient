import { BehaviorSubject } from "rxjs";

export default class SkinProfileModel {
    constructor() {
        this.isHypoAllergenic = new BehaviorSubject(false);
        this.isDairyFree = new BehaviorSubject(false);
        this.isGlutenFree = new BehaviorSubject(false);
        this.isPeanutFreeProduct = new BehaviorSubject(false);
        this.isSugarFree = new BehaviorSubject(false);
        this.isAlcohalFree = new BehaviorSubject(false);
        this.isOilFree = new BehaviorSubject(false);
        this.isSiliconeFree = new BehaviorSubject(false);
    }
}
