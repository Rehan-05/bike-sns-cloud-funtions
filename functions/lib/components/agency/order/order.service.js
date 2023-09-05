"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalOrder = void 0;
const dayjs = require("dayjs");
const v1_1 = require("firebase-functions/v1");
const config_1 = require("../../../firebase/config");
const apiErrorHandler_1 = require("../../../utils/apiErrorHandler");
// create a function that get total order of this month
const getTotalOrder = async (month, agencyId) => {
    try {
        const year = dayjs().year();
        // 
        let today = year + '-' + month + '-' + '01';
        const firstDayOfMonth = dayjs(today).startOf('month').format('YYYY-MM-DD');
        const lastDayOfMonth = dayjs(today).endOf('month').format('YYYY-MM-DD');
        // get vendor id
        const vendors = await config_1.db.collection('Vendor').where('agency_id', '==', agencyId).get();
        const vendorIds = vendors.docs.map((doc) => doc.id);
        if (vendorIds.length === 0)
            return [];
        const totalOrder = await config_1.db.collection('Order').where("vendor_id", "in", vendorIds).where('created_at', '>=', firstDayOfMonth).where('created_at', '<=', lastDayOfMonth).get();
        // return all orders
        return totalOrder.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in fetching total order', error: err });
        throw new apiErrorHandler_1.HttpException(500, 'Internal Server Error', 1000);
    }
};
exports.getTotalOrder = getTotalOrder;
//# sourceMappingURL=order.service.js.map