"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCOUNT_SCHEMA = void 0;
const validation_1 = require("../../../constants/validation");
exports.ACCOUNT_SCHEMA = {
    email: (0, validation_1.VALIDATION_EMAIL)('body'),
    password: (0, validation_1.VALIDATION_PASSWORD_UPDATE)('body'),
    newPassword: (0, validation_1.VALIDATION_PASSWORD_UPDATE)('body'),
};
//# sourceMappingURL=account.validation.js.map