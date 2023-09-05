"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.forgotPassword = exports.createVendor = void 0;
const dayjs = require("dayjs");
const v1_1 = require("firebase-functions/v1");
const config_1 = require("../../../firebase/config");
const apiErrorHandler_1 = require("../../../utils/apiErrorHandler");
const auth_1 = require("firebase/auth");
const createVendor = async (name, phone, email, password, address, agency_id) => {
    let error;
    try {
        // create user
        const user = await config_1.adminauth.createUser({
            email,
            password,
        });
        let uid = user.uid;
        console.log(uid);
        // create vendor
        const vendor = await config_1.db.collection('Vendor').doc(uid).set({
            vendor_id: uid,
            agency_id,
            name,
            email,
            phone,
            address,
            password,
            status: 'active',
            created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            deleted_at: null,
        });
        // return vendor
        return { id: uid };
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in creating vendor', error: err });
        if (err.code === 'auth/email-already-in-use') {
            error = new apiErrorHandler_1.HttpException(400, 'Email already in use', 1000);
        }
        else if (err.code === 'auth/invalid-email') {
            error = new apiErrorHandler_1.HttpException(400, 'Invalid email', 1000);
        }
        throw error || new apiErrorHandler_1.HttpException(500, err.message, 1000);
    }
};
exports.createVendor = createVendor;
const forgotPassword = async (email) => {
    let error;
    try {
        await (0, auth_1.sendPasswordResetEmail)(config_1.auth, email);
    }
    catch (err) {
        if (err.code === 'auth/user-not-found') {
            error = new apiErrorHandler_1.HttpException(404, 'User not found', 1000);
        }
        else if (err.code === 'auth/invalid-email') {
            error = new apiErrorHandler_1.HttpException(400, 'Invalid email', 1000);
        }
        throw error || new apiErrorHandler_1.HttpException(500, 'Internal Server Error', 1000);
    }
};
exports.forgotPassword = forgotPassword;
const updatePassword = async (password, token) => {
    let error;
    try {
        await (0, auth_1.confirmPasswordReset)(config_1.auth, token, password);
    }
    catch (err) {
        if (err.code === 'auth/expired-action-code') {
            error = new apiErrorHandler_1.HttpException(400, 'Expired action code', 1000);
        }
        else if (err.code === 'auth/invalid-action-code') {
            error = new apiErrorHandler_1.HttpException(400, 'Invalid action code', 1000);
        }
        else if (err.code === 'auth/user-disabled') {
            error = new apiErrorHandler_1.HttpException(400, 'User disabled', 1000);
        }
        else if (err.code === 'auth/user-not-found') {
            error = new apiErrorHandler_1.HttpException(400, 'User not found', 1000);
        }
        else if (err.code === 'auth/weak-password') {
            error = new apiErrorHandler_1.HttpException(400, 'Weak password', 1000);
        }
        throw error || new apiErrorHandler_1.HttpException(500, 'Internal Server Error', 1000);
    }
};
exports.updatePassword = updatePassword;
//# sourceMappingURL=auth.service.js.map