"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.forgotPassword = exports.logout = exports.login = void 0;
const auth_1 = require("firebase/auth");
const v1_1 = require("firebase-functions/v1");
const config_1 = require("../../../firebase/config");
const jwt_1 = require("../../../utils/jwt");
const service = require("./agency.service");
const ApiErrorStructure_1 = require("../../../utils/ApiErrorStructure");
const agency_message_1 = require("./agency.message");
const login = async (req, res, next) => {
    try {
        v1_1.logger.info('Login request received');
        const { password, email } = req.body;
        const user = await (0, auth_1.signInWithEmailAndPassword)(config_1.auth, email, password);
        // check if the user is admin
        const admin = await config_1.db.collection('admins').doc(user.user.uid).get();
        if (!admin.exists) {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(agency_message_1.authMessages.notAdmin, 401, 1003));
        }
        const token = (0, jwt_1.encodeJwt)({ id: user.user.uid }, '1d');
        const refreshToken = (0, jwt_1.encodeJwt)({ id: user.user.uid }, '365d');
        v1_1.logger.info(`User logged in with uid: ${user.user.uid}`);
        res.status(200).json({ accessToken: token, refreshToken: refreshToken, email: user.user.email, uid: user.user.uid });
    }
    catch (err) {
        v1_1.logger.error(err);
        if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/user-not-found') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(agency_message_1.authMessages['auth/user-not-found'], 401, 1000));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/wrong-password') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(agency_message_1.authMessages['auth/wrong-password'], 401, 1001));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/invalid-email') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(agency_message_1.authMessages['auth/invalid-email'], 401, 1002));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/user-disabled') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(agency_message_1.authMessages['auth/user-disabled'], 401, 1003));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/argument-error') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(agency_message_1.authMessages['auth/argument-error'], 401, 1004));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/invalid-credential') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(agency_message_1.authMessages['auth/invalid-credential'], 401, 1005));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/operation-not-allowed') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(agency_message_1.authMessages['auth/operation-not-allowed'], 401, 1006));
        }
        else {
            return res.status(500).json((0, ApiErrorStructure_1.ERROR)(agency_message_1.authMessages.internalServerError, 500, 1007));
        }
    }
};
exports.login = login;
const logout = async (req, res, next) => {
    try {
        console.info(req.user);
        res.status(200).json();
    }
    catch (err) {
        next(err);
    }
};
exports.logout = logout;
const forgotPassword = async (req, res, next) => {
    try {
        v1_1.logger.info(req.body);
        const { email } = req.body;
        // check if the user exist
        const user = await config_1.db.collection('admins').where('email', '==', email).get();
        if (user.empty) {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)('User not found', 401, 1000));
        }
        let isSuccess = await service.forgotPassword(email);
        v1_1.logger.info(`Password reset link sent to ${email}`);
        if (isSuccess == "success") {
            res.status(200).json({
                message: 'Password reset link sent to your email',
            });
        }
    }
    catch (err) {
        v1_1.logger.error(err);
        // handle error here
        if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/user-not-found') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)('User not found', 401, 1000));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/invalid-email') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)('Invalid email', 401, 1002));
        }
        else {
            return res.status(500).json((0, ApiErrorStructure_1.ERROR)('Internal server error', 500, 1007));
        }
    }
};
exports.forgotPassword = forgotPassword;
const updatePassword = async (req, res, next) => {
    try {
        v1_1.logger.info("updatePassword");
        const { password, token } = req.body;
        let response = await service.updatePassword(password, token);
        if (response === "success") {
            v1_1.logger.info(`Password updated`);
            res.status(200).json({
                message: 'Password updated successfully',
            });
        }
        else {
            v1_1.logger.info(`Password not updated`);
            res.status(500).json({
                message: 'Something went wrong',
                response
            });
        }
    }
    catch (err) {
        v1_1.logger.error(err);
        // next(err);
        // return error if token is invalid
        if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/argument-error') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)('Argument error', 401, 1004));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/expired-action-code') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)('Expired action code', 401, 1008));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/invalid-action-code') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)('Invalid action code', 401, 1009));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/user-disabled') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)('User disabled', 401, 1003));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/user-not-found') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)('User not found', 401, 1000));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/weak-password') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)('Weak password', 401, 1010));
        }
        else {
            return res.status(500).json((0, ApiErrorStructure_1.ERROR)('Internal server error', 500, 1007));
        }
    }
};
exports.updatePassword = updatePassword;
//# sourceMappingURL=agency.controller.js.map