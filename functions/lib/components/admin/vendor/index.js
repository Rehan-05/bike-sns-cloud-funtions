"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const express_validator_1 = require("express-validator");
const vendor_validation_1 = require("./vendor.validation");
const controller = require("./vendor.controller");
const validation_1 = require("../../../utils/validation");
const verifyToken_middleware_1 = require("../../../middlewares/verifyToken.middleware");
const router = express.Router();
router.get('/:vendorId/orders', verifyToken_middleware_1.authAdmin, (0, express_validator_1.checkSchema)(vendor_validation_1.ORDER_GET_SCHEMA), validation_1.checkValidation, controller.getOrderByMonth);
router.delete('/:vendorId', verifyToken_middleware_1.authAdmin, (0, express_validator_1.checkSchema)(vendor_validation_1.VENDOR_ID_SCHEMA), validation_1.checkValidation, controller.deActivateVendor);
exports.default = router;
//# sourceMappingURL=index.js.map