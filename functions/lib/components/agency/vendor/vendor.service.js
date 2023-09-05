"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVendorWithAgencyId = exports.getOrderByMonth = void 0;
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
// get vendor with agency id
const getVendorWithAgencyId = async (agency_id) => {
    try {
        const vendors = await config_1.db.collection('Vendor').where('agency_id', '==', agency_id).get();
        // return all vendors
        return vendors.docs.map((doc) => ({
            id: doc.id,
            vendor_id: doc.data().vendor_id,
            name: doc.data().name,
            email: doc.data().email,
            phone: doc.data().phone,
            address: doc.data().address,
            status: doc.data().status,
            agency_id: doc.data().agency_id,
            created_at: doc.data().created_at,
            updated_at: doc.data().updated_at,
        }));
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in fetching total order', error: err });
        throw new apiErrorHandler_1.HttpException(500, 'Internal Server Error', 1000);
    }
};
exports.getVendorWithAgencyId = getVendorWithAgencyId;
//# sourceMappingURL=vendor.service.js.map