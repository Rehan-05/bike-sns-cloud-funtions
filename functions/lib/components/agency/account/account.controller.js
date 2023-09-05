"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAccount = void 0;
const v1_1 = require("firebase-functions/v1");
const config_1 = require("../../../firebase/config");
const service = require("./account.service");
const ApiErrorStructure_1 = require("../../../utils/ApiErrorStructure");
const account_message_1 = require("./account.message");
const dayjs = require("dayjs");
const updateAccount = async (req, res, next) => {
    try {
        v1_1.logger.info('Account update request received');
        let agency;
        const { password, newPassword, agencyName } = req.body;
        // get agency from database
        agency = await config_1.db.collection('Agency').doc(req.user.id).get();
        if (agency.empty) {
            v1_1.logger.info('Agency not found');
            return res.status(404).json((0, ApiErrorStructure_1.ERROR)(account_message_1.authMessages.notFound, 404, 1000));
        }
        if (password && newPassword) {
            v1_1.logger.info('Password update request received');
            await service.UpdatePassword(agency.data().email, password, newPassword);
            v1_1.logger.info('Password updated successfully');
        }
        // if agency exist then update the agency
        v1_1.logger.info('Agency found');
        await config_1.db.collection('Agency').doc(req.user.id).update({
            name: agencyName || agency.docs[0].data().name,
            updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
        });
        v1_1.logger.info('Account updated successfully');
        return res.status(200).json({ message: 'Account updated successfully' });
    }
    catch (err) {
        v1_1.logger.error(err);
        if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/user-not-found') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(account_message_1.authMessages['auth/user-not-found'], 401, 1000));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/wrong-password') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(account_message_1.authMessages['auth/wrong-password'], 401, 1001));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/invalid-email') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(account_message_1.authMessages['auth/invalid-email'], 401, 1002));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/user-disabled') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(account_message_1.authMessages['auth/user-disabled'], 401, 1003));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/argument-error') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(account_message_1.authMessages['auth/argument-error'], 401, 1004));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/invalid-credential') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(account_message_1.authMessages['auth/invalid-credential'], 401, 1005));
        }
        else if ((err === null || err === void 0 ? void 0 : err.code) === 'auth/operation-not-allowed') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(account_message_1.authMessages['auth/operation-not-allowed'], 401, 1006));
        }
        else {
            return res.status(500).json((0, ApiErrorStructure_1.ERROR)(account_message_1.authMessages.internalServerError, 500, 1007));
        }
    }
};
exports.updateAccount = updateAccount;
//# sourceMappingURL=account.controller.js.map