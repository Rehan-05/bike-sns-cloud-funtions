"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAgencyCollectionPassword = exports.updateAgencyCollection = exports.UpdatePassword = void 0;
const dayjs = require("dayjs");
const config_1 = require("../../../firebase/config");
const apiErrorHandler_1 = require("../../../utils/apiErrorHandler");
const auth_1 = require("firebase/auth");
const UpdatePassword = async (email, password, newPassword) => {
    let error;
    let user;
    try {
        user = await (0, auth_1.signInWithEmailAndPassword)(config_1.auth, email, password);
        await (0, auth_1.updatePassword)(user.user, newPassword);
    }
    catch (err) {
        error = err instanceof Error ? err : (0, apiErrorHandler_1.badImplementationException)(err);
    }
    if (error) {
        return Promise.reject(error);
    }
    else {
        return Promise.resolve(user.user);
    }
};
exports.UpdatePassword = UpdatePassword;
// update the agency collection
// logger.info(`User updat collection updated with uid: ${agency.uid}`);
const updateAgencyCollection = async (agencyId, name) => {
    let error;
    try {
        if (name) {
            await config_1.db.collection('Agency').doc(agencyId).update({ updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'), agencyName: name });
        }
        else {
            await config_1.db.collection('Agency').doc(agencyId).update({ updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss') });
        }
    }
    catch (err) {
        error = err instanceof Error ? err : (0, apiErrorHandler_1.badImplementationException)(err);
    }
    if (error) {
        return Promise.reject(error);
    }
    else {
        return Promise.resolve("success");
    }
};
exports.updateAgencyCollection = updateAgencyCollection;
const updateAgencyCollectionPassword = async (agencyId, name, newPassword) => {
    let error;
    try {
        if (name) {
            await config_1.db.collection('Agency').doc(agencyId).update({ updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'), agencyName: name, password: newPassword });
        }
        else {
            await config_1.db.collection('Agency').doc(agencyId).update({ updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'), password: newPassword });
        }
    }
    catch (err) {
        error = err instanceof Error ? err : (0, apiErrorHandler_1.badImplementationException)(err);
    }
    if (error) {
        return Promise.reject(error);
    }
    else {
        return Promise.resolve("success");
    }
};
exports.updateAgencyCollectionPassword = updateAgencyCollectionPassword;
//# sourceMappingURL=account.service.js.map