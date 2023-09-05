"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaveTouring = exports.joinTouring = exports.touringUserList = exports.touringList = exports.addTouringEvent = void 0;
const dayjs = require("dayjs");
const v1_1 = require("firebase-functions/v1");
const config_1 = require("../../../firebase/config");
const apiErrorHandler_1 = require("../../../utils/apiErrorHandler");
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
const joinTouring = async (id, eventId) => {
    let error;
    try {
        const touring = await config_1.db.collection('TouringEvent').doc(eventId).update({
            NumberOfAccept: config_1.db.FieldValue.increment(1),
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
        v1_1.logger.info('joinTouring executed in serivces');
        return Promise.resolve('success');
    }
};
exports.joinTouring = joinTouring;
const leaveTouring = async (id, eventId) => {
    let error;
    try {
        const touring = await config_1.db.collection('TouringEvent').doc(eventId).update({
            NumberOfAccept: config_1.db.FieldValue.increment(-1),
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
        v1_1.logger.info('leaveTouring executed in serivces');
        return Promise.resolve('success');
    }
};
exports.leaveTouring = leaveTouring;
//# sourceMappingURL=touring.service.js.map