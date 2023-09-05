"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.forgotPassword = exports.createAdminUser = void 0;
const dayjs = require("dayjs");
const v1_1 = require("firebase-functions/v1");
const config_1 = require("../../../firebase/config");
const apiErrorHandler_1 = require("../../../utils/apiErrorHandler");
const auth_1 = require("firebase/auth");
// create a function to create a new user
const createAdminUser = async () => {
    try {
        // check if the admin exist then stop execution
        const admin = await config_1.db.collection('Admin').where('email', '==', "hamsaeed1122@gmail.com").get();
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
        await config_1.adminauth.setCustomUserClaims(user.uid, { admin: true });
        config_1.db.collection('Admin').doc(user.uid).set({
            admin_id: user.uid,
            email: "hamsaeed1122@gmail.com",
            privilege: 'admin',
            password: "Newton@123",
            created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            deleted_at: null,
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
        v1_1.logger.info(`Password updated for`);
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
//# sourceMappingURL=auth.service.js.map