"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmail = exports.getLatestOrders = exports.getTotalActivatedVendor = exports.getTotalOrder = void 0;
const dayjs = require("dayjs");
const v1_1 = require("firebase-functions/v1");
const config_1 = require("../../../firebase/config");
const apiErrorHandler_1 = require("../../../utils/apiErrorHandler");
// create a function that get total order of this month 
const getTotalOrder = async (agencyId) => {
    try {
        const today = dayjs().format('YYYY-MM-DD');
        const firstDayOfMonth = dayjs(today).startOf('month').format('YYYY-MM-DD');
        const lastDayOfMonth = dayjs(today).endOf('month').format('YYYY-MM-DD');
        // get vendor id
        const vendors = await config_1.db.collection('Vendor').where('agency_id', '==', agencyId).get();
        const vendorIds = vendors.docs.map((doc) => doc.id);
        if (vendorIds.length === 0)
            return 0;
        const totalOrder = await config_1.db.collection("Order").where("vendor_id", "in", vendorIds).where('created_at', '>=', firstDayOfMonth).where('created_at', '<=', lastDayOfMonth).get();
        return totalOrder.size;
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in fetching total order', error: err });
        throw new apiErrorHandler_1.HttpException(500, 'Internal Server Error', 1000);
    }
};
exports.getTotalOrder = getTotalOrder;
// get total activated vendor
const getTotalActivatedVendor = async (agencyId) => {
    try {
        const totalActivatedVendor = await config_1.db.collection('Vendor').where("agency_id", "==", agencyId).where('status', '==', 'active').get();
        return totalActivatedVendor.size;
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in fetching total activated vendor', error: err });
        throw new apiErrorHandler_1.HttpException(500, 'Internal Server Error', 1000);
    }
};
exports.getTotalActivatedVendor = getTotalActivatedVendor;
// get latest 5 orders
const getLatestOrders = async (agencyId) => {
    try {
        const today = dayjs().format('YYYY-MM-DD');
        const firstDayOfMonth = dayjs(today).startOf('month').format('YYYY-MM-DD');
        const lastDayOfMonth = dayjs(today).endOf('month').format('YYYY-MM-DD');
        const vendors = await config_1.db.collection('Vendor').where('agency_id', '==', agencyId).get();
        const vendorIds = vendors.docs.map((doc) => doc.id);
        if (vendorIds.length === 0)
            return [];
        const latestOrders = await config_1.db.collection("Order").where("vendor_id", "in", vendorIds).where('created_at', '>=', firstDayOfMonth).where('created_at', '<=', lastDayOfMonth).orderBy('created_at', 'desc').limit(5).get();
        return latestOrders.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in fetching latest orders', error: err });
        throw new apiErrorHandler_1.HttpException(500, 'Internal Server Error', 1000);
    }
};
exports.getLatestOrders = getLatestOrders;
// get admin email
const getEmail = async (admin_id) => {
    try {
        const agency = await config_1.db.collection('Agency').doc(admin_id).get();
        return agency.data().email;
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in fetching admin email', error: err });
        throw new apiErrorHandler_1.HttpException(500, 'Internal Server Error', 1000);
    }
};
exports.getEmail = getEmail;
//# sourceMappingURL=dashboard.service.js.map