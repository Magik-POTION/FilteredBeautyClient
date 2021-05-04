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
        // TODO: Binds skincare profile to model.
    }

    /**
     * Updates skincare profile in the database.
     * @param {String} uid
     * @param {*} skinCareProfile an object containing skinCareProfile data.
     */
    async updateSkinCareProfile(uid, skinCareProfile) {
        await firebaseFirestoreService.updateSkingProfile(skinCareProfile);
        // TODO: Binds skincare profile to model.
    }
}
