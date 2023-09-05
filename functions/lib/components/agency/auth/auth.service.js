"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.forgotPassword = void 0;
const v1_1 = require("firebase-functions/v1");
const config_1 = require("../../../firebase/config");
const apiErrorHandler_1 = require("../../../utils/apiErrorHandler");
const auth_1 = require("firebase/auth");
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
//# sourceMappingURL=auth.service.js.map