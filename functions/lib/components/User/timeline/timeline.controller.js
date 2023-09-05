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
exports.unlikeComment = exports.likeComment = exports.unlikePost = exports.likePost = exports.deleteCommentOnPost = exports.commentOnPost = exports.postDetail = exports.listOfTimelinePosts = exports.searchTimelinePosts = exports.editDailyPost = exports.dailyPost = void 0;
const v1_1 = require("firebase-functions/v1");
const service = __importStar(require("./timeline.service"));
const ApiErrorStructure_1 = require("../../../utils/ApiErrorStructure");
const timeline_message_1 = require("./timeline.message");
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
        return res.status(500).json((0, ApiErrorStructure_1.ERROR)(timeline_message_1.timeLineMessages.internalServerError, 500, 1001));
    }
};
exports.editDailyPost = editDailyPost;
const searchTimelinePosts = async (req, res, next) => {
    try {
        const { offset, keyword } = req.query;
        const { uid } = req.user;
        const posts = await service.searchTimelinePosts(Number(offset), keyword, uid);
        res.status(200).json({ posts });
    }
    catch (err) {
        v1_1.logger.error(err);
        return res.status(500).json((0, ApiErrorStructure_1.ERROR)(timeline_message_1.timeLineMessages.internalServerError, 500, 1001));
    }
};
exports.searchTimelinePosts = searchTimelinePosts;
const listOfTimelinePosts = async (req, res, next) => {
    try {
        const { offset } = req.query;
        const { uid } = req.user;
        const posts = await service.listOfTimelinePosts(Number(offset), uid);
        res.status(200).json({ posts });
    }
    catch (err) {
        v1_1.logger.error(err);
        return res.status(500).json((0, ApiErrorStructure_1.ERROR)(timeline_message_1.timeLineMessages.internalServerError, 500, 1001));
    }
};
exports.listOfTimelinePosts = listOfTimelinePosts;
const postDetail = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { uid } = req.user;
        const post = await service.postDetail(postId, uid);
        res.status(200).json({ post });
    }
    catch (err) {
        v1_1.logger.error(err);
        return res.status(500).json((0, ApiErrorStructure_1.ERROR)(timeline_message_1.timeLineMessages.internalServerError, 500, 1001));
    }
};
exports.postDetail = postDetail;
const commentOnPost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { uid } = req.user;
        const { image, text } = req.body;
        const post = await service.commentOnPost(postId, uid, image, text);
        res.status(200).json({ post });
    }
    catch (err) {
        v1_1.logger.error(err);
        return res.status(500).json((0, ApiErrorStructure_1.ERROR)(timeline_message_1.timeLineMessages.internalServerError, 500, 1001));
    }
};
exports.commentOnPost = commentOnPost;
const deleteCommentOnPost = async (req, res, next) => {
    try {
        const { postId, commentId } = req.params;
        const { uid } = req.user;
        const post = await service.deleteCommentOnPost(postId, uid, commentId);
        res.status(200).json({ post });
    }
    catch (err) {
        v1_1.logger.error(err);
        return res.status(500).json((0, ApiErrorStructure_1.ERROR)(timeline_message_1.timeLineMessages.internalServerError, 500, 1001));
    }
};
exports.deleteCommentOnPost = deleteCommentOnPost;
const likePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { uid } = req.user;
        const post = await service.likePost(postId, uid);
        res.status(200).json({ post });
    }
    catch (err) {
        v1_1.logger.error(err);
        return res.status(500).json((0, ApiErrorStructure_1.ERROR)(timeline_message_1.timeLineMessages.internalServerError, 500, 1001));
    }
};
exports.likePost = likePost;
const unlikePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { uid } = req.user;
        const post = await service.unlikePost(postId, uid);
        res.status(200).json({ post });
    }
    catch (err) {
        v1_1.logger.error(err);
        return res.status(500).json((0, ApiErrorStructure_1.ERROR)(timeline_message_1.timeLineMessages.internalServerError, 500, 1001));
    }
};
exports.unlikePost = unlikePost;
const likeComment = async (req, res, next) => {
    try {
        const { postId, commentId } = req.params;
        const { uid } = req.user;
        const post = await service.likeComment(postId, uid, commentId);
        res.status(200).json({ post });
    }
    catch (err) {
        v1_1.logger.error(err);
        return res.status(500).json((0, ApiErrorStructure_1.ERROR)(timeline_message_1.timeLineMessages.internalServerError, 500, 1001));
    }
};
exports.likeComment = likeComment;
const unlikeComment = async (req, res, next) => {
    try {
        const { postId, commentId } = req.params;
        const { uid } = req.user;
        const post = await service.unlikeComment(postId, uid, commentId);
        res.status(200).json({ post });
    }
    catch (err) {
        v1_1.logger.error(err);
        return res.status(500).json((0, ApiErrorStructure_1.ERROR)(timeline_message_1.timeLineMessages.internalServerError, 500, 1001));
    }
};
exports.unlikeComment = unlikeComment;
//# sourceMappingURL=timeline.controller.js.map