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
exports.decodeJwt = exports.encodeJwt = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const errorMessage_1 = require("../constants/errorMessage");
const env_1 = require("../middlewares/env");
const apiErrorHandler_1 = require("./apiErrorHandler");
const encodeJwt = (payload, expiresIn) => {
    const jwtoken = jwt.sign({ payload }, env_1.JWT_SECRET, { expiresIn });
    return jwtoken;
};
exports.encodeJwt = encodeJwt;
const decodeJwt = (jwtoken) => {
    try {
        const decode = jwt.verify(jwtoken, env_1.JWT_SECRET);
        if (typeof decode === 'string')
            throw (0, apiErrorHandler_1.validationException)(errorMessage_1.INVALID_JWT_TOKEN);
        return Promise.resolve(decode);
    }
    catch (err) {
        return Promise.reject({ message: errorMessage_1.INVALID_JWT_TOKEN, code: 400, err });
    }
};
exports.decodeJwt = decodeJwt;
//# sourceMappingURL=jwt.js.map