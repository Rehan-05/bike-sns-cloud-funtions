"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const apiErrorHandler_1 = require("../utils/apiErrorHandler");
const errorHandler = (app) => {
    app.use((req, res, next) => next());
    app.use((err, req, res, next) => {
        if (!(err instanceof apiErrorHandler_1.HttpException)) {
            err = (0, apiErrorHandler_1.badImplementationException)(err);
        }
        res.status(err.statusCode || 500).json(err.message);
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map