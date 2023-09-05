"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyResetPasswordToken = void 0;
const auth_1 = require("firebase/auth");
const config_1 = require("../firebase/config");
const ApiErrorStructure_1 = require("../utils/ApiErrorStructure");
// create a middleware to verify the reset password token
const verifyResetPasswordToken = async (req, res, next) => {
    const { token } = req.body;
    try {
        let email = await (0, auth_1.verifyPasswordResetCode)(config_1.auth, token);
        if (email) {
            next();
        }
        else {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)('Invalid token', 401, 1000));
        }
    }
    catch (err) {
        if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/invalid-action-code') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)('Invalid token', 401, 1000));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/expired-action-code') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)('Expired token', 401, 1011));
        }
        else {
            return res.status(500).json((0, ApiErrorStructure_1.ERROR)('Internal server error', 500, 1007));
        }
    }
};
exports.verifyResetPasswordToken = verifyResetPasswordToken;
//# sourceMappingURL=RestPasswordToken.middleware.js.map