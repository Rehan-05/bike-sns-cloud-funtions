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
exports.updateUserProfile = exports.listOfPosts = exports.listOfTouring = exports.userProfile = void 0;
const v1_1 = require("firebase-functions/v1");
const service = __importStar(require("./myGarage.service"));
const myGarage_message_1 = require("./myGarage.message");
const apiErrorHandler_1 = require("../../../utils/apiErrorHandler");
const userProfile = async (req, res, next) => {
    try {
        v1_1.logger.info('userProfile');
        const userId = req.params.userID;
        const user = await service.getUserProfile(userId);
        if (user === "success") {
            return res.status(200).json({
                status: 200,
                message: "user found successfully",
            });
        }
        else {
            return res.status(404).json({
                status: 404,
                message: myGarage_message_1.myGarageMessages.notFound,
            });
        }
    }
    catch (err) {
        return next((0, apiErrorHandler_1.badImplementationException)(err));
    }
};
exports.userProfile = userProfile;
const listOfTouring = async (req, res, next) => {
    try {
        //query offset 
        const offset = req.query.offset;
        const limit = req.query.limit;
        const userId = req.params.userID;
        const data = await service.listOfTouring(offset, userId);
        if (data === "success") {
            return res.status(200).json({
                status: 200,
                message: "user found successfully",
            });
        }
        else {
            return res.status(404).json({
                status: 404,
                message: myGarage_message_1.myGarageMessages.notFound,
            });
        }
    }
    catch (err) {
        return next((0, apiErrorHandler_1.badImplementationException)(err));
    }
};
exports.listOfTouring = listOfTouring;
const listOfPosts = async (req, res, next) => {
    try {
        const offset = req.query.offset;
        const limit = req.query.limit;
        const userId = req.params.userID;
        const data = await service.listOfPosts(offset, userId);
        if (data === "success") {
            return res.status(200).json({
                status: 200,
                message: "user found successfully",
            });
        }
        else {
            return res.status(404).json({
                status: 404,
                message: myGarage_message_1.myGarageMessages.notFound,
            });
        }
    }
    catch (err) {
        return next((0, apiErrorHandler_1.badImplementationException)(err));
    }
};
exports.listOfPosts = listOfPosts;
const updateUserProfile = async (req, res, next) => {
    try {
        v1_1.logger.info('updateUserProfile');
        const userId = req.params.userID;
        const { ImageUrl, nickName } = req.body;
        const user = await service.updateUserProfile(userId, ImageUrl, nickName);
        if (user === "success") {
            return res.status(200).json({
                status: 200,
                message: "user found successfully",
            });
        }
        else {
            return res.status(404).json({
                status: 404,
                message: myGarage_message_1.myGarageMessages.notFound,
            });
        }
    }
    catch (err) {
        return next((0, apiErrorHandler_1.badImplementationException)(err));
    }
};
exports.updateUserProfile = updateUserProfile;
//# sourceMappingURL=myGarage.controller.js.map