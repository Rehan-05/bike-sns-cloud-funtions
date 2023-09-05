"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDER_GET_SCHEMA = exports.VENDOR_ID_SCHEMA = void 0;
const validation_1 = require("../../../constants/validation");
exports.VENDOR_ID_SCHEMA = {
    vendorId: (0, validation_1.VALIDATION_AGENCY_ID)("params"),
};
exports.ORDER_GET_SCHEMA = {
    month: (0, validation_1.VALIDATION_MONTH)("query"),
    vendorId: (0, validation_1.VALIDATION_AGENCY_ID)("params"),
};
//# sourceMappingURL=vendor.validation.js.map