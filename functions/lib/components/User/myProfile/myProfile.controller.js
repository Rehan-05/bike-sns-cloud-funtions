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
exports.touringUserList = exports.touringList = exports.addTouringEvent = exports.editDailyPost = exports.dailyPost = exports.getProfileData = void 0;
const v1_1 = require("firebase-functions/v1");
const config_1 = require("../../../firebase/config");
const service = __importStar(require("./myProfile.service"));
const ApiErrorStructure_1 = require("../../../utils/ApiErrorStructure");
const myProfile_message_1 = require("./myProfile.message");
const getProfileData = async (req, res, next) => {
    try {
        v1_1.logger.info('Get profile data request received');
        const { uid } = req.params;
        const user = await config_1.db.collection('User').doc(uid).get();
        if (!user.exists) {
            return res.status(404).json((0, ApiErrorStructure_1.ERROR)(myProfile_message_1.profileMessages.notFound, 404, 1000));
        }
        const data = user.data();
        const { email, nickName, phone, gender, birthDay, province } = data;
        res.status(200).json({ email, nickName, phone, gender, birthDay, province });
    }
    catch (err) {
        v1_1.logger.error(err);
        return res.status(500).json((0, ApiErrorStructure_1.ERROR)(myProfile_message_1.profileMessages.internalServerError, 500, 1001));
    }
};
exports.getProfileData = getProfileData;
const dailyPost = async (req, res, next) => {
    try {
        v1_1.logger.info('Daily post request received');
        const { id } = req.user;
        const { title, category, tag, bike, image } = req.body;
        const newdata = await service.dailyPost(id, title, category, tag, bike, image);
        if (newdata === 'success') {
            v1_1.logger.info(`Daily post created successfully`);
            res.status(200).json({
                message: 'Daily post created successfully',
            });
        }
        else {
            v1_1.logger.info(`Daily post not created successfully`);
            res.status(500).json({
                message: 'Something went wrong',
            });
        }
    }
    catch (err) {
        v1_1.logger.error(err);
    }
};
exports.dailyPost = dailyPost;
const editDailyPost = async (req, res, next) => {
    try {
        v1_1.logger.info('Edit post request received');
        const { id } = req.user;
        const { postId } = req.params;
        const { title, category, tag, bike, image } = req.body;
        const editdata = await service.editDailyPost(id, postId, title, category, tag, bike, image);
        if (editdata === 'success') {
            v1_1.logger.info(`Daily post edit successfully`);
            res.status(200).json({
                message: 'Daily post edit successfully',
            });
        }
        else {
            v1_1.logger.info(`Daily post not edit successfully`);
            res.status(500).json({
                message: 'Something went wrong',
            });
        }
    }
    catch (err) {
        v1_1.logger.error(err);
        return res.status(500).json((0, ApiErrorStructure_1.ERROR)(myProfile_message_1.profileMessages.internalServerError, 500, 1001));
    }
};
exports.editDailyPost = editDailyPost;
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
        return res.status(500).json((0, ApiErrorStructure_1.ERROR)(myProfile_message_1.profileMessages.internalServerError, 500, 1001));
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
        return res.status(500).json((0, ApiErrorStructure_1.ERROR)(myProfile_message_1.profileMessages.internalServerError, 500, 1001));
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
        return res.status(500).json((0, ApiErrorStructure_1.ERROR)(myProfile_message_1.profileMessages.internalServerError, 500, 1001));
    }
};
exports.touringUserList = touringUserList;
//# sourceMappingURL=myProfile.controller.js.map