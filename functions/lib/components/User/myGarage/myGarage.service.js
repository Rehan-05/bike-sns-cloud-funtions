"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfile = exports.listOfPosts = exports.listOfTouring = exports.getUserProfile = void 0;
const v1_1 = require("firebase-functions/v1");
const config_1 = require("../../../firebase/config");
const apiErrorHandler_1 = require("../../../utils/apiErrorHandler");
const getUserProfile = async (userID) => {
    try {
        v1_1.logger.info('getUserProfile');
        const user = await config_1.db.collection('User').doc(userID).get();
        if (user.exists) {
            return 'success';
        }
        else {
            return 'fail';
        }
    }
    catch (err) {
        return next((0, apiErrorHandler_1.badImplementationException)(err));
    }
};
exports.getUserProfile = getUserProfile;
function next(arg0) {
    throw new Error('Function not implemented.');
}
const listOfTouring = async (offset, userID) => {
    try {
        //get the user list of touring
        const user = await config_1.db.collection('User').doc(userID).get();
        if (user.exists) {
            const touring = await config_1.db
                .collection('TouringEvent')
                .where('userID', '==', userID)
                .orderBy('createdAt', 'desc')
                .limit(10)
                .offset(offset)
                .get();
            if (touring.empty) {
                return 'fail';
            }
            else {
                return 'success';
            }
        }
    }
    catch (err) {
        return next((0, apiErrorHandler_1.badImplementationException)(err));
    }
};
exports.listOfTouring = listOfTouring;
const listOfPosts = async (offset, userID) => {
    try {
        v1_1.logger.info('listOfPosts');
        //get list of user posts
        const user = await config_1.db.collection('User').doc(userID).get();
        if (user.exists) {
            const posts = await config_1.db
                .collection('User_Posts')
                .where('userID', '==', userID)
                .orderBy('createdAt', 'desc')
                .limit(10)
                .offset(offset)
                .get();
            if (posts.empty) {
                return 'fail';
            }
            else {
                return 'success';
            }
        }
    }
    catch (err) {
        return next((0, apiErrorHandler_1.badImplementationException)(err));
    }
};
exports.listOfPosts = listOfPosts;
//update user profile
const updateUserProfile = async (userID, ImageUrl, nickName) => {
    try {
        v1_1.logger.info('update User Profile Data');
        const user = await config_1.db.collection('User').doc(userID).get();
        if (user.exists) {
            const update = await config_1.db.collection('User').doc(userID).update({
                ImageUrl: ImageUrl,
                nickName: nickName,
            });
            return 'success';
        }
        else {
            return 'fail';
        }
    }
    catch (err) {
        return next((0, apiErrorHandler_1.badImplementationException)(err));
    }
};
exports.updateUserProfile = updateUserProfile;
//# sourceMappingURL=myGarage.service.js.map