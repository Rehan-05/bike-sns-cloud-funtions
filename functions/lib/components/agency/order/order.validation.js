"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDER_GET_SCHEMA = exports.ORDER_ID_SCHEMA = exports.ACCOUNT_SCHEMA = void 0;
const validation_1 = require("../../../constants/validation");
exports.ACCOUNT_SCHEMA = {
    email: (0, validation_1.VALIDATION_EMAIL)('body'),
    password: (0, validation_1.VALIDATION_PASSWORD_UPDATE)('body'),
    newPassword: (0, validation_1.VALIDATION_PASSWORD_UPDATE)('body'),
};
exports.ORDER_ID_SCHEMA = {
    orderId: (0, validation_1.VALIDATION_AGENCY_ID)("params"),
};
exports.ORDER_GET_SCHEMA = {
    month: (0, validation_1.VALIDATION_MONTH)("query"),
};
//# sourceMappingURL=order.validation.js.map