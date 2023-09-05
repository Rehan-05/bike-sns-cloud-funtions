"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUser = exports.isAdmin = void 0;
const apiErrorHandler_1 = require("./apiErrorHandler");
const isAdmin = (req, res, next) => {
    next((0, apiErrorHandler_1.unauthorizedException)(new Error('unauthorizedException')));
};
exports.isAdmin = isAdmin;
const isUser = (req, res, next) => {
    next((0, apiErrorHandler_1.unauthorizedException)(new Error('unauthorizedException')));
};
exports.isUser = isUser;
//# sourceMappingURL=auth.js.map