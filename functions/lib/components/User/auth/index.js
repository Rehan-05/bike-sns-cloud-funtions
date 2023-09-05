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
const express = __importStar(require("express"));
const express_validator_1 = require("express-validator");
const auth_validation_1 = require("./auth.validation");
const controller = __importStar(require("./auth.controller"));
const validation_1 = require("../../../utils/validation");
const auth_1 = require("../../../utils/auth");
const RestPasswordToken_middleware_1 = require("../../../middlewares/RestPasswordToken.middleware");
const router = express.Router();
router.put('/login', (0, express_validator_1.checkSchema)(auth_validation_1.LOGIN_SCHEMA), validation_1.checkValidation, controller.login);
router.put('/logout', auth_1.isUser, controller.logout);
router.put('/password/forgot', (0, express_validator_1.checkSchema)(auth_validation_1.FORGOT_PASSWORD_SCHEMA), validation_1.checkValidation, controller.forgotPassword);
router.put('/password/reset', (0, express_validator_1.checkSchema)(auth_validation_1.UPDATE_PASSWORD_SCHEMA), validation_1.checkValidation, RestPasswordToken_middleware_1.verifyResetPasswordToken, controller.updatePassword);
router.post('/register/email/confirm', (0, express_validator_1.checkSchema)(auth_validation_1.VERIFYEMAIL_SCHEMA), validation_1.checkValidation, controller.verifyEmailAddress);
router.post('/register', controller.registrationUser);
exports.default = router;
//# sourceMappingURL=index.js.map