"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkValidation = void 0;
const express_validator_1 = require("express-validator");
const apiErrorHandler_1 = require("./apiErrorHandler");
const checkValidation = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        let validation = (0, apiErrorHandler_1.validationException)(errors);
        if (validation && validation.statusCode && validation.message) {
            return res.status(validation.statusCode).json({
                message: validation.message,
                error: validation.stack,
            });
        }
    }
    else
        next();
};
exports.checkValidation = checkValidation;
//# sourceMappingURL=validation.js.map