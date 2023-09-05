"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REGISTERATION_SCHEMA = exports.VERIFYEMAIL_SCHEMA = exports.UPDATE_PASSWORD_SCHEMA = exports.FORGOT_PASSWORD_SCHEMA = exports.LOGIN_SCHEMA = void 0;
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
exports.VERIFYEMAIL_SCHEMA = {
    email: (0, validation_1.VALIDATION_EMAIL)('body'),
};
exports.REGISTERATION_SCHEMA = {
    email: (0, validation_1.VALIDATION_EMAIL)('body'),
    nickName: (0, validation_1.VALIDATION_ACCOUNT_NAME)('body'),
    gender: (0, validation_1.VALIDATION_GENDER)('body'),
    phone: (0, validation_1.VALIDATION_PHONE)('body'),
    birthDay: (0, validation_1.VALIDATION_BIRTHDAY)('body'),
    province: (0, validation_1.VALIDATION_PROVINCE)('body'),
    password: (0, validation_1.VALIDATION_PASSWORD)('body'),
};
//# sourceMappingURL=auth.validation.js.map