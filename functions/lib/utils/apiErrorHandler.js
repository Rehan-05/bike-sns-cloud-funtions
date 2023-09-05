"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.badImplementationException = exports.pageNoFoundException = exports.emailConflictException = exports.dataConflictException = exports.unauthorizedException = exports.payjpInvalidCardException = exports.dataExceedException = exports.userNotActivateException = exports.dataNotExistException = exports.validationException = exports.HttpException = void 0;
const ERROR = __importStar(require("../constants/errorMessage"));
class HttpException extends Error {
    constructor(statusCode, message, subStatusCode) {
        super(message);
        this.statusCode = statusCode || 500;
        this.message = message;
        this.errorMessage = message;
        this.subStatusCode = subStatusCode;
    }
}
exports.HttpException = HttpException;
const validationException = (errors) => {
    errors ? console.error(errors) : console.error(ERROR.VALIDATION);
    return new HttpException(400, errors.message || ERROR.VALIDATION, 1001);
};
exports.validationException = validationException;
const dataNotExistException = (error) => {
    error ? console.error(error) : console.error(ERROR.DATANOTFOUND);
    return new HttpException(400, error.message || ERROR.DATANOTFOUND, 1002);
};
exports.dataNotExistException = dataNotExistException;
const userNotActivateException = (error) => {
    error ? console.error(error) : console.error(ERROR.USERNOTACTIVATE);
    return new HttpException(400, error.message || ERROR.USERNOTACTIVATE, 1003);
};
exports.userNotActivateException = userNotActivateException;
const dataExceedException = (error) => {
    error ? console.error(error) : console.error(ERROR.DATAEXCEED);
    return new HttpException(400, error.message || ERROR.DATAEXCEED, 1004);
};
exports.dataExceedException = dataExceedException;
const payjpInvalidCardException = (error) => {
    error ? console.error(error) : console.error(ERROR.PAYJP_INVALID_CARD);
    return new HttpException(400, ERROR.PAYJP_INVALID_CARD, 1005);
};
exports.payjpInvalidCardException = payjpInvalidCardException;
const unauthorizedException = (error) => {
    error ? console.error(error) : console.error(ERROR.UNAUTH);
    return new HttpException(401, error.message || ERROR.UNAUTH, 2001);
};
exports.unauthorizedException = unauthorizedException;
const dataConflictException = (error) => {
    error ? console.error(error) : console.error(ERROR.CONFLICT);
    return new HttpException(409, error.message || ERROR.CONFLICT, 3001);
};
exports.dataConflictException = dataConflictException;
const emailConflictException = (error) => {
    error ? console.error(error) : console.error(ERROR.CONFLICT);
    return new HttpException(409, error.message || ERROR.CONFLICT, 2002);
};
exports.emailConflictException = emailConflictException;
const pageNoFoundException = (error) => {
    error ? console.error(error) : console.error(ERROR.PAGENOTFOUND);
    return new HttpException(404, error.message || ERROR.PAGENOTFOUND, 4000);
};
exports.pageNoFoundException = pageNoFoundException;
const badImplementationException = (error) => {
    error ? console.error(error) : console.error(ERROR.BADIMPLEMENTATION);
    return new HttpException(500, error.message || ERROR.BADIMPLEMENTATION, 5000);
};
exports.badImplementationException = badImplementationException;
//# sourceMappingURL=apiErrorHandler.js.map