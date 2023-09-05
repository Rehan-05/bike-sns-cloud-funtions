"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const express_validator_1 = require("express-validator");
const account_validation_1 = require("./account.validation");
const controller = require("./account.controller");
const validation_1 = require("../../../utils/validation");
const verifyToken_middleware_1 = require("../../../middlewares/verifyToken.middleware");
const router = express.Router();
router.put('', (0, express_validator_1.checkSchema)(account_validation_1.ACCOUNT_SCHEMA), validation_1.checkValidation, verifyToken_middleware_1.authVendors, controller.updateAccount);
exports.default = router;
//# sourceMappingURL=index.js.map