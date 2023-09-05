"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const express_validator_1 = require("express-validator");
const agency_validation_1 = require("./agency.validation");
const controller = require("./agency.controller");
const validation_1 = require("../../../utils/validation");
const auth_1 = require("../../../utils/auth");
const RestPasswordToken_middleware_1 = require("../../../middlewares/RestPasswordToken.middleware");
const router = express.Router();
router.put('/login', (0, express_validator_1.checkSchema)(agency_validation_1.LOGIN_SCHEMA), validation_1.checkValidation, controller.login);
router.put('/logout', auth_1.isAdmin, controller.logout);
router.put('/password/forgot', (0, express_validator_1.checkSchema)(agency_validation_1.FORGOT_PASSWORD_SCHEMA), validation_1.checkValidation, controller.forgotPassword);
router.put('/password/reset', (0, express_validator_1.checkSchema)(agency_validation_1.UPDATE_PASSWORD_SCHEMA), validation_1.checkValidation, RestPasswordToken_middleware_1.verifyResetPasswordToken, controller.updatePassword);
exports.default = router;
//# sourceMappingURL=index.js.map