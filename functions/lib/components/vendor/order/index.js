"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const express_validator_1 = require("express-validator");
const order_validation_1 = require("./order.validation");
const controller = require("./order.controller");
const validation_1 = require("../../../utils/validation");
const verifyToken_middleware_1 = require("../../../middlewares/verifyToken.middleware");
const router = express.Router();
router.get('', verifyToken_middleware_1.authVendors, (0, express_validator_1.checkSchema)(order_validation_1.ORDER_GET_SCHEMA), validation_1.checkValidation, controller.getOrderByMonth);
router.post('', verifyToken_middleware_1.authVendors, (0, express_validator_1.checkSchema)(order_validation_1.ORDER_SCHEMA), validation_1.checkValidation, controller.createOrder);
router.put('/:orderId/delivered', verifyToken_middleware_1.authVendors, (0, express_validator_1.checkSchema)(order_validation_1.ORDER_ID_SCHEMA), validation_1.checkValidation, controller.deliverOrder);
router.put('/:orderId/notDelivered', verifyToken_middleware_1.authVendors, (0, express_validator_1.checkSchema)(order_validation_1.ORDER_ID_SCHEMA), validation_1.checkValidation, controller.not_delivered);
exports.default = router;
//# sourceMappingURL=index.js.map