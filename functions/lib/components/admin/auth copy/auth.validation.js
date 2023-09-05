"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_PASSWORD_SCHEMA = exports.FORGOT_PASSWORD_SCHEMA = exports.LOGIN_SCHEMA = void 0;
const validation_1 = require("../../../constants/validation");
exports.LOGIN_SCHEMA = {
    email: (0, validation_1.VALIDATION_EMAIL)('body'),
    password: (0, validation_1.VALIDATION_PASSWORD)('body'),
};
exports.FORGOT_PASSWORD_SCHEMA = {
    email: (0, validation_1.VALIDATION_EMAIL)('body'),
};
exports.UPDATE_PASSWORD_SCHEMA = {
    password: (0, validation_1.VALIDATION_PASSWORD)('body'),
    token: (0, validation_1.VALIDATION_TOKEM)('body'),
};
//# sourceMappingURL=auth.validation.js.map