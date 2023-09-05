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
exports.leaveTouring = exports.joinTouring = exports.touringUserList = exports.touringList = exports.addTouringEvent = void 0;
const v1_1 = require("firebase-functions/v1");
const service = __importStar(require("./touring.service"));
const ApiErrorStructure_1 = require("../../../utils/ApiErrorStructure");
const touring_message_1 = require("./touring.message");
const addTouringEvent = async (req, res, next) => {
    try {
        v1_1.logger.info('Add touring event request received');
        const { id } = req.user;
        const { title, eventDetail, destination, NumberOfAccept, budget, shareWith } = req.body;
        const touringData = await service.addTouringEvent(id, title, eventDetail, destination, NumberOfAccept, budget, shareWith);
        if (touringData === 'success') {
            v1_1.logger.info(`touring event added successfully`);
            res.status(200).json({
                message: 'touring event added successfully',
                result: touringData,
            });
        }
        else {
            v1_1.logger.info(`touring event not added`);
            res.status(500).json({
                message: 'Something went wrong',
            });
        }
    }
    catch (err) {
        v1_1.logger.error(err);
        return res.status(500).json((0, ApiErrorStructure_1.ERROR)(touring_message_1.touringMessages.internalServerError, 500, 1001));
    }
};
exports.addTouringEvent = addTouringEvent;
const touringList = async (req, res, next) => {
    try {
        v1_1.logger.info('All created touring event');
        const { id } = req.user;
        const touringList = await service.touringList(id);
        if (touringList) {
            v1_1.logger.info(`touring event list`);
            res.status(200).json({
                message: 'touring event list',
                result: touringList,
            });
        }
    }
    catch (err) {
        v1_1.logger.error(err);
        return res.status(500).json((0, ApiErrorStructure_1.ERROR)(touring_message_1.touringMessages.internalServerError, 500, 1001));
    }
};
exports.touringList = touringList;
const touringUserList = async (req, res, next) => {
    try {
        v1_1.logger.info('All Joined touring events');
        const { id } = req.user;
        const touringList = await service.touringUserList(id);
        if (touringList) {
            v1_1.logger.info(`touring joined list`);
            res.status(200).json({
                message: 'touring joined list',
                result: touringList,
            });
        }
    }
    catch (err) {
        v1_1.logger.error(err);
        return res.status(500).json((0, ApiErrorStructure_1.ERROR)(touring_message_1.touringMessages.internalServerError, 500, 1001));
    }
};
exports.touringUserList = touringUserList;
const joinTouring = async (req, res, next) => {
    try {
        v1_1.logger.info('Join touring event request received');
        const { id } = req.user;
        const { touringId } = req.params;
        const joinTouring = await service.joinTouring(id, touringId);
        if (joinTouring === 'success') {
            v1_1.logger.info(`touring event joined successfully`);
            res.status(200).json({
                message: 'touring event joined successfully',
            });
        }
        else {
            v1_1.logger.info(`touring event not joined`);
            res.status(500).json({
                message: 'Something went wrong',
            });
        }
    }
    catch (err) {
        v1_1.logger.error(err);
        return res.status(500).json((0, ApiErrorStructure_1.ERROR)(touring_message_1.touringMessages.internalServerError, 500, 1001));
    }
};
exports.joinTouring = joinTouring;
const leaveTouring = async (req, res, next) => {
    try {
        v1_1.logger.info('Leave touring event request received');
        const { id } = req.user;
        const { touringId } = req.params;
        const leaveTouring = await service.leaveTouring(id, touringId);
        if (leaveTouring === 'success') {
            v1_1.logger.info(`touring event left successfully`);
            res.status(200).json({
                message: 'touring event left successfully',
            });
        }
        else {
            v1_1.logger.info(`touring event not left`);
            res.status(500).json({
                message: 'Something went wrong',
            });
        }
    }
    catch (err) {
        v1_1.logger.error(err);
        return res.status(500).json((0, ApiErrorStructure_1.ERROR)(touring_message_1.touringMessages.internalServerError, 500, 1001));
    }
};
exports.leaveTouring = leaveTouring;
//# sourceMappingURL=touring.controller.js.map