"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileData = void 0;
const v1_1 = require("firebase-functions/v1");
const config_1 = require("../../../firebase/config");
const ApiErrorStructure_1 = require("../../../utils/ApiErrorStructure");
const account_message_1 = require("./account.message");
const dayjs = require("dayjs");
const getProfileData = async (req, res, next) => {
    try {
        v1_1.logger.info('Get profile data request received');
        console.log("im here");
        const { uid } = req.params;
        const user = await config_1.db.collection('User').doc(uid).get();
        if (!user.exists) {
            return res.status(404).json((0, ApiErrorStructure_1.ERROR)(account_message_1.authMessages.notFound, 404, 1000));
        }
        const data = user.data();
        const { email, name, phone, role, uid: id, profileImage, createdAt } = data;
        res.status(200).json({ email, name, phone, role, id, profileImage, createdAt: dayjs(createdAt).format('DD-MM-YYYY') });
    }
    catch (err) {
        v1_1.logger.error(err);
        return res.status(500).json((0, ApiErrorStructure_1.ERROR)(account_message_1.authMessages.internalServerError, 500, 1001));
    }
};
exports.getProfileData = getProfileData;
//# sourceMappingURL=account.controller.js.map