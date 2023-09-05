"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrationUser = exports.verifyEmailAddress = exports.updatePassword = exports.forgotPassword = exports.logout = exports.login = void 0;
const auth_1 = require("firebase/auth");
const v1_1 = require("firebase-functions/v1");
const config_1 = require("../../../firebase/config");
const jwt_1 = require("../../../utils/jwt");
const service = __importStar(require("./auth.service"));
const ApiErrorStructure_1 = require("../../../utils/ApiErrorStructure");
const auth_message_1 = require("./auth.message");
const login = async (req, res, next) => {
    try {
        v1_1.logger.info('Login request received');
        const { password, email } = req.body;
        const user = await (0, auth_1.signInWithEmailAndPassword)(config_1.auth, email, password);
        // check if the user is admin
        const admin = await config_1.db.collection('User').doc(user.user.uid).get();
        if (!admin.exists) {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(auth_message_1.authMessages.notAdmin, 401, 1003));
        }
        const token = (0, jwt_1.encodeJwt)({ id: user.user.uid }, '1d');
        const refreshToken = (0, jwt_1.encodeJwt)({ id: user.user.uid }, '365d');
        v1_1.logger.info(`User logged in with uid: ${user.user.uid}`);
        res.status(200).json({ accessToken: token, refreshToken: refreshToken, email: user.user.email, uid: user.user.uid, type: 'admin' });
    }
    catch (err) {
        v1_1.logger.error(err);
        if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/user-not-found') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(auth_message_1.authMessages['auth/user-not-found'], 401, 1000));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/wrong-password') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(auth_message_1.authMessages['auth/wrong-password'], 401, 1001));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/invalid-email') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(auth_message_1.authMessages['auth/invalid-email'], 401, 1002));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/user-disabled') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(auth_message_1.authMessages['auth/user-disabled'], 401, 1003));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/argument-error') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(auth_message_1.authMessages['auth/argument-error'], 401, 1004));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/invalid-credential') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(auth_message_1.authMessages['auth/invalid-credential'], 401, 1005));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/operation-not-allowed') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(auth_message_1.authMessages['auth/operation-not-allowed'], 401, 1006));
        }
        else {
            return res.status(500).json((0, ApiErrorStructure_1.ERROR)(auth_message_1.authMessages.internalServerError, 500, 1007));
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
        const user = await config_1.db.collection('User').where('email', '==', email).get();
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
// Verify that email address exit or not
const verifyEmailAddress = async (req, res, next) => {
    try {
        v1_1.logger.info(req.body);
        const { email } = req.body;
        // check if the user exist
        const user = await config_1.db.collection('User').where('email', '==', email).get();
        if (!user.empty) {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)('user is already registered', 401, 1000));
        }
        let isSuccess = await service.verifyEmailAddress(email);
        console.log("here is error message", isSuccess);
        v1_1.logger.info(`Verification link sent to ${email}`);
        if (isSuccess == "success") {
            res.status(200).json({
                message: 'Verification link sent to your email',
            });
        }
    }
    catch (err) {
        v1_1.logger.error(err);
        // handle error here
        if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/user-found') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)('User found', 401, 1000));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/invalid-email') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)('Invalid email', 401, 1002));
        }
        else {
            return res.status(500).json((0, ApiErrorStructure_1.ERROR)('Internal server error', 500, 1007));
        }
    }
};
exports.verifyEmailAddress = verifyEmailAddress;
// Verify registration link then register user in the DB
const registrationUser = async (req, res, next) => {
    try {
        v1_1.logger.info("verifyRegistrationLink");
        const { token } = req.body;
        if (!token) {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)('Invalid token', 401, 1002));
        }
        const { email, nickName, gender, phone, birthDay, province, password } = req.body;
        if (email && nickName && gender && phone && birthDay && province && password) {
            const resp = await service.registrationUser(email, nickName, gender, phone, birthDay, province, password);
            if (resp === "success") {
                v1_1.logger.info(`User registered`);
                res.status(200).json({
                    message: 'User registered successfully',
                });
            }
            else {
                v1_1.logger.info(`User not registered`);
                res.status(500).json({
                    message: 'Something went wrong',
                });
            }
        }
        else {
            return res.status(400).json((0, ApiErrorStructure_1.ERROR)('Bad request', 400, 1001));
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
exports.registrationUser = registrationUser;
//# sourceMappingURL=auth.controller.js.map