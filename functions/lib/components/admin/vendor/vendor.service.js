"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deActivateVendor = exports.getOrderByMonth = void 0;
const dayjs = require("dayjs");
const v1_1 = require("firebase-functions/v1");
const config_1 = require("../../../firebase/config");
const apiErrorHandler_1 = require("../../../utils/apiErrorHandler");
// get order by month and vendor id
const getOrderByMonth = async (month, vendor_id) => {
    try {
        const year = dayjs().year();
        // 
        let today = year + '-' + month + '-' + '01';
        const firstDayOfMonth = dayjs(today).startOf('month').format('YYYY-MM-DD');
        const lastDayOfMonth = dayjs(today).endOf('month').format('YYYY-MM-DD');
        const orders = await config_1.db.collection('Order').where('vendor_id', '==', vendor_id).where('created_at', '>=', firstDayOfMonth).where('created_at', '<=', lastDayOfMonth).get();
        // return all orders
        return orders.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in fetching total order', error: err });
        throw new apiErrorHandler_1.HttpException(500, 'Internal Server Error', 1000);
    }
};
exports.getOrderByMonth = getOrderByMonth;
// deactivate vendor account
const deActivateVendor = async (vendorId) => {
    var _a;
    try {
        const vendor = await config_1.db.collection('Vendor').doc(vendorId).get();
        if (vendor.exists && ((_a = vendor.data()) === null || _a === void 0 ? void 0 : _a.status) === 'active') {
            // also disable vendor account from firebase auth
            await config_1.adminauth.updateUser(vendorId, {
                disabled: true,
            });
            await config_1.db.collection('Vendor').doc(vendorId).update({
                status: 'deactivated',
                deleted_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            });
            return { message: 'Vendor Deactivated Successfully' };
        }
        else {
            throw new apiErrorHandler_1.HttpException(404, 'vendor Not Found or vendor already deactivated', 1009);
        }
    }
    catch (err) {
        throw new apiErrorHandler_1.HttpException(400, err.message, 1009);
    }
};
exports.deActivateVendor = deActivateVendor;
//# sourceMappingURL=vendor.service.js.map