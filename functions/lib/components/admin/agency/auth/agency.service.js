"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.forgotPassword = exports.createAdminUser = void 0;
const dayjs = require("dayjs");
const v1_1 = require("firebase-functions/v1");
const config_1 = require("../../../firebase/config");
const apiErrorHandler_1 = require("../../../utils/apiErrorHandler");
const auth_1 = require("firebase/auth");
// create a function to create a new user
const createAdminUser = async (req, res) => {
    try {
        // check if the admin exist then stop execution
        const admin = await config_1.db.collection('admins').where('email', '==', "hamsaeed1122@gmail.com").get();
        if (!admin.empty) {
            v1_1.logger.info('Admin already exist');
            return;
        }
        ;
        const user = await config_1.adminauth.createUser({
            email: "hamsaeed1122@gmail.com",
            password: "Newton@123",
        });
        v1_1.logger.info(`User created with uid: ${user.uid}`);
        // also add this user to admin collection in firestore
        await config_1.adminauth.setCustomUserClaims(user.uid, { admin: true });
        config_1.db.collection('admins').doc(user.uid).set({
            email: "hamsaeed1122@gmail.com",
            privilege: 'admin',
            createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        });
        return user;
    }
    catch (err) {
        v1_1.logger.error(err);
    }
};
exports.createAdminUser = createAdminUser;
const forgotPassword = async (email) => {
    let error;
    try {
        await (0, auth_1.sendPasswordResetEmail)(config_1.auth, email);
    }
    catch (err) {
        error = err instanceof Error ? err : (0, apiErrorHandler_1.badImplementationException)(err);
    }
    if (error) {
        v1_1.logger.error(error);
        return Promise.reject(error);
    }
    else {
        v1_1.logger.info('Password reset link sent');
        return Promise.resolve("success");
    }
};
exports.forgotPassword = forgotPassword;
const updatePassword = async (password, token) => {
    let error;
    try {
        await (0, auth_1.confirmPasswordReset)(config_1.auth, token, password);
    }
    catch (err) {
        error = err instanceof Error ? err : (0, apiErrorHandler_1.badImplementationException)(err);
    }
    if (error) {
        return Promise.reject(error);
    }
    else {
        return Promise.resolve("success");
    }
};
exports.updatePassword = updatePassword;
//# sourceMappingURL=agency.service.js.map