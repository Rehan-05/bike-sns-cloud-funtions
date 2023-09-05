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
exports.updateAccount = void 0;
const v1_1 = require("firebase-functions/v1");
const config_1 = require("../../../firebase/config");
const service = __importStar(require("./account.service"));
const ApiErrorStructure_1 = require("../../../utils/ApiErrorStructure");
const account_message_1 = require("./account.message");
const dayjs = require("dayjs");
const updateAccount = async (req, res, next) => {
    try {
        v1_1.logger.info('Account update request received');
        const { password, email, newPassword } = req.body;
        if (password && email && newPassword) {
            const result = await service.UpdatePassword(email, password, newPassword);
            v1_1.logger.info(`User updated with uid: ${result}`);
            const admin = await config_1.db
                .collection('Admin')
                .doc(result.uid)
                .update({ updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'), password: newPassword });
            v1_1.logger.info(`User updat collection updated with uid: ${result.uid}`);
            res.status(200).json({ message: 'Update Password Successfully' });
        }
        else {
            res.status(400).json({ message: 'Bad Request' });
        }
    }
    catch (err) {
        v1_1.logger.error(err);
        if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/user-not-found') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(account_message_1.authMessages['auth/user-not-found'], 401, 1000));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/wrong-password') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(account_message_1.authMessages['auth/wrong-password'], 401, 1001));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/invalid-email') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(account_message_1.authMessages['auth/invalid-email'], 401, 1002));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/user-disabled') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(account_message_1.authMessages['auth/user-disabled'], 401, 1003));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/argument-error') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(account_message_1.authMessages['auth/argument-error'], 401, 1004));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/invalid-credential') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(account_message_1.authMessages['auth/invalid-credential'], 401, 1005));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/operation-not-allowed') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(account_message_1.authMessages['auth/operation-not-allowed'], 401, 1006));
        }
        else {
            return res.status(500).json((0, ApiErrorStructure_1.ERROR)(account_message_1.authMessages.internalServerError, 500, 1007));
        }
    }
};
exports.updateAccount = updateAccount;
//# sourceMappingURL=account.controller.js.map