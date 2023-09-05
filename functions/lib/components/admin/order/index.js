"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const express_validator_1 = require("express-validator");
const order_validation_1 = require("./order.validation");
const controller = require("./order.controller");
const validation_1 = require("../../../utils/validation");
const verifyToken_middleware_1 = require("../../../middlewares/verifyToken.middleware");
const router = express.Router();
router.get('', verifyToken_middleware_1.authAdmin, (0, express_validator_1.checkSchema)(order_validation_1.ORDER_GET_SCHEMA), validation_1.checkValidation, controller.getOrderByMonth);
router.put('/:orderId/cancel', verifyToken_middleware_1.authAdmin, (0, express_validator_1.checkSchema)(order_validation_1.ORDER_ID_SCHEMA), validation_1.checkValidation, controller.cancelOrder);
router.put('/:orderId/delivered', verifyToken_middleware_1.authAdmin, (0, express_validator_1.checkSchema)(order_validation_1.ORDER_ID_SCHEMA), validation_1.checkValidation, controller.deliverOrder);
router.put('/:orderId/shipped', verifyToken_middleware_1.authAdmin, (0, express_validator_1.checkSchema)(order_validation_1.ORDER_ID_SCHEMA), validation_1.checkValidation, controller.shipOrder);
exports.default = router;
//# sourceMappingURL=index.js.map