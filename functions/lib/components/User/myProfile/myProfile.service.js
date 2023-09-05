"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.touringUserList = exports.touringList = exports.addTouringEvent = exports.editDailyPost = exports.dailyPost = void 0;
const dayjs = require("dayjs");
const v1_1 = require("firebase-functions/v1");
const config_1 = require("../../../firebase/config");
const apiErrorHandler_1 = require("../../../utils/apiErrorHandler");
const dailyPost = async (id, title, category, tag, bike, image) => {
    let error;
    try {
        const post = await config_1.db.collection('User_Posts').add({
            uid: id,
            title: title,
            category: category,
            tag: tag,
            bike: bike,
            image: image,
            createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        });
    }
    catch (err) {
        error = err instanceof Error ? err : (0, apiErrorHandler_1.badImplementationException)(err);
    }
    if (error) {
        v1_1.logger.error(error);
        return Promise.reject(error);
    }
    else {
        v1_1.logger.info('Post executed in serivces for creation');
        return Promise.resolve('success');
    }
};
exports.dailyPost = dailyPost;
const editDailyPost = async (id, postId, title, category, tag, bike, image) => {
    let error;
    try {
        const data = await config_1.db.collection('User_Posts').doc(postId).update({
            uid: id,
            title: title,
            category: category,
            tag: tag,
            bike: bike,
            image: image,
        });
    }
    catch (err) {
        error = err instanceof Error ? err : (0, apiErrorHandler_1.badImplementationException)(err);
    }
    if (error) {
        v1_1.logger.error(error);
        return Promise.reject(error);
    }
    else {
        v1_1.logger.info('Edit post executed in serivces');
        return Promise.resolve('success');
    }
};
exports.editDailyPost = editDailyPost;
const addTouringEvent = async (id, title, eventDetail, destination, NumberOfAccept, budget, shareWith) => {
    let error;
    try {
        const touring = await config_1.db.collection('TouringEvent').add({
            uid: id,
            title: title,
            eventDetail: eventDetail,
            destination: destination,
            NumberOfAccept: NumberOfAccept,
            budget: budget,
            shareWith: shareWith,
            createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        });
    }
    catch (err) {
        error = err instanceof Error ? err : (0, apiErrorHandler_1.badImplementationException)(err);
    }
    if (error) {
        v1_1.logger.error(error);
        return Promise.reject(error);
    }
    else {
        v1_1.logger.info('touringEvent executed in serivces');
        return Promise.resolve('success');
    }
};
exports.addTouringEvent = addTouringEvent;
const touringList = async (id) => {
    let error;
    try {
        const touring = await config_1.db.collection('TouringEvent').where('uid', '==', id).get();
        const touringList = touring.docs.map((doc) => {
            return Object.assign({ id: doc.id }, doc.data());
        });
        return Promise.resolve(touringList);
    }
    catch (err) {
        error = err instanceof Error ? err : (0, apiErrorHandler_1.badImplementationException)(err);
    }
    if (error) {
        v1_1.logger.error(error);
        return Promise.reject(error);
    }
    else {
        v1_1.logger.info('touringList executed in serivces');
        return Promise.resolve('success');
    }
};
exports.touringList = touringList;
const touringUserList = async (id) => {
    let error;
    try {
        const touring = await config_1.db.collection('TouringEvent').where('shareWith', '==', id).get();
        const touringList = touring.docs.map((doc) => {
            return Object.assign({ id: doc.id }, doc.data());
        });
        return Promise.resolve(touringList);
    }
    catch (err) {
        error = err instanceof Error ? err : (0, apiErrorHandler_1.badImplementationException)(err);
    }
    if (error) {
        v1_1.logger.error(error);
        return Promise.reject(error);
    }
    else {
        v1_1.logger.info('touringUserList executed in serivces');
        return Promise.resolve('success');
    }
};
exports.touringUserList = touringUserList;
//# sourceMappingURL=myProfile.service.js.map