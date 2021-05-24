import SkinProfileModel from "../models/SkinProfileModel";
import firebaseFirestoreService from "../services/firebaseFirestoreService";

/**
 * Manages a SkinProfileModel and the logic.
 */
export default class SkinProfileController {
    /**
     * Constructor that sets the model.
     * @param {SkinProfileModel} skinProfileModel
     */
    constructor(skinProfileModel) {
        this.skinProfileModel = skinProfileModel;
    }

    /**
     * Loads the user's skin profile from the database.
     * @param {String} uid firebase uid.
     */
    async load(uid) {
        // fetches skin profile.
        let skinProfileData = await firebaseFirestoreService.getSkinProfile(
            uid
        );
        if (skinProfileData) {
            for (let property in skinProfileData) {
                this.skinProfileModel[property].next(skinProfileData[property]);
            }
        }
    }

    /**
     * Updates skincare profile in the database.
     * @param {String} uid
     * @param {*} skinCareProfile an object containing skinCareProfile data.
     */
    async updateSkinCareProfile(uid, skinCareProfile) {
        await firebaseFirestoreService.updateSkinProfile(uid, skinCareProfile);
    }

    /**
     * Sets the value of the given name in the model.
     * @param {String} name
     * @param {Boolean} value
     */
    set(name, value) {
        this.skinProfileModel[name].next(value);
    }

    getProperties() {
        return {
            Hypoallergenic: this.skinProfileModel.Hypoallergenic.getValue(),
            Dairy_Free: this.skinProfileModel.Dairy_Free.getValue(),
            Gluten_Free: this.skinProfileModel.Gluten_Free.getValue(),
            Peanut_Free_Product:
                this.skinProfileModel.Peanut_Free_Product.getValue(),
            Sugar_Free: this.skinProfileModel.Sugar_Free.getValue(),
            alcohol_free: this.skinProfileModel.alcohol_free.getValue(),
            oil_free: this.skinProfileModel.oil_free.getValue(),
            silicone_free: this.skinProfileModel.silicone_free.getValue(),
        };
    }

    /**
     * Sets default skinprofile parameters.
     */
    reset() {
        for (let property in this.skinProfileModel) {
            this.skinProfileModel[property].next(false);
        }
    }
}
