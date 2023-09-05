"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const express_validator_1 = require("express-validator");
const order_validation_1 = require("./order.validation");
const controller = require("./order.controller");
const validation_1 = require("../../../utils/validation");
const verifyToken_middleware_1 = require("../../../middlewares/verifyToken.middleware");
const router = express.Router();
router.get('', verifyToken_middleware_1.authAgency, (0, express_validator_1.checkSchema)(order_validation_1.ORDER_GET_SCHEMA), validation_1.checkValidation, controller.getOrderByMonth);
exports.default = router;
//# sourceMappingURL=index.js.map