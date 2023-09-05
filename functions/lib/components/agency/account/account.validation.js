"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCOUNT_SCHEMA = void 0;
const validation_1 = require("../../../constants/validation");
exports.ACCOUNT_SCHEMA = {
    password: (0, validation_1.VALIDATION_ACCOUNT_PASSWORD)('body'),
    newPassword: (0, validation_1.VALIDATION_ACCOUNT_PASSWORD)('body'),
    agencyName: (0, validation_1.VALIDATION_ACCOUNT_NAME)('body'),
};
//# sourceMappingURL=account.validation.js.map