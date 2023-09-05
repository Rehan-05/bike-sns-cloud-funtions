"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDER_GET_SCHEMA = exports.ORDER_ID_SCHEMA = exports.ORDER_SCHEMA = void 0;
const validation_1 = require("../../../constants/validation");
exports.ORDER_SCHEMA = {
    order_date: (0, validation_1.VALIDATION_ORDER_DATE)('body'),
    number: (0, validation_1.VALIDATION_ORDER_NUMBER)('body'),
};
exports.ORDER_ID_SCHEMA = {
    orderId: (0, validation_1.VALIDATION_AGENCY_ID)("params"),
};
exports.ORDER_GET_SCHEMA = {
    month: (0, validation_1.VALIDATION_MONTH)("query"),
};
//# sourceMappingURL=order.validation.js.map