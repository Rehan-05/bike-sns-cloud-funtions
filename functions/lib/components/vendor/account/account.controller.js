"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAccount = void 0;
const v1_1 = require("firebase-functions/v1");
const config_1 = require("../../../firebase/config");
const service = require("./account.service");
const dayjs = require("dayjs");
const apiErrorHandler_1 = require("../../../utils/apiErrorHandler");
const updateAccount = async (req, res, next) => {
    var _a, _b, _c, _d;
    try {
        v1_1.logger.info('Account update request received');
        const { password, newPassword, name, phone, address } = req.body;
        const vendor = await config_1.db.collection('Vendor').doc(req.user.id).get();
        if (!vendor.exists) {
            throw new apiErrorHandler_1.HttpException(404, 'Vendor not found', 1000);
        }
        if (password && newPassword) {
            const result = await service.UpdatePassword(vendor.data().email, password, newPassword);
        }
        // get vendor and update
        await config_1.db.collection('Vendor').doc(req.user.id).update({
            name: name || ((_a = vendor.data()) === null || _a === void 0 ? void 0 : _a.name),
            phone: phone || ((_b = vendor.data()) === null || _b === void 0 ? void 0 : _b.phone),
            address: address || ((_c = vendor.data()) === null || _c === void 0 ? void 0 : _c.address),
            password: newPassword || ((_d = vendor.data()) === null || _d === void 0 ? void 0 : _d.password),
            updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
        });
        res.status(200).json({ message: "Update Password Successfully" });
    }
    catch (err) {
        v1_1.logger.error(err);
        //  handleError
        if (err instanceof apiErrorHandler_1.HttpException && err.statusCode && err.subStatusCode) {
            return res.status(err.statusCode).json({ message: err.message, status: err.statusCode, code: err.subStatusCode });
        }
        return res.status(500).json({ message: err.message, status: 500, code: 1000 });
    }
    ;
};
exports.updateAccount = updateAccount;
//# sourceMappingURL=account.controller.js.map