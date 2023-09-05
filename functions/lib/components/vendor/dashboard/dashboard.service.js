"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalDeliveredOrder = exports.getTotalShippedOrder = exports.getAdminEmail = exports.getLatestOrders = exports.getTotalOrder = void 0;
const dayjs = require("dayjs");
const v1_1 = require("firebase-functions/v1");
const config_1 = require("../../../firebase/config");
const apiErrorHandler_1 = require("../../../utils/apiErrorHandler");
// create a function that get total order of this month 
const getTotalOrder = async (vendorId) => {
    try {
        const today = dayjs().format('YYYY-MM-DD');
        const firstDayOfMonth = dayjs().startOf('month').format('YYYY-MM-DD');
        const lastDayOfMonth = dayjs().endOf('month').format('YYYY-MM-DD');
        const totalOrder = await config_1.db.collection('Order').where('vendor_id', '==', vendorId).where('created_at', '>=', firstDayOfMonth).where('created_at', '<=', lastDayOfMonth).get();
        return totalOrder.size;
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in fetching total order', error: err });
        throw new apiErrorHandler_1.HttpException(500, 'Internal Server Error', 1000);
    }
};
exports.getTotalOrder = getTotalOrder;
// get latest 5 orders
const getLatestOrders = async (vendorId) => {
    try {
        const today = dayjs().format('YYYY-MM-DD');
        const firstDayOfMonth = dayjs().startOf('month').format('YYYY-MM-DD');
        const lastDayOfMonth = dayjs().endOf('month').format('YYYY-MM-DD');
        const latestOrders = await config_1.db.collection('Order').where("vendor_id", "==", vendorId).where('created_at', '>=', firstDayOfMonth).where('created_at', '<=', lastDayOfMonth).orderBy('created_at', 'desc').limit(5).get();
        return latestOrders.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in fetching latest orders', error: err });
        throw new apiErrorHandler_1.HttpException(500, 'Internal Server Error', 1000);
    }
};
exports.getLatestOrders = getLatestOrders;
// get admin email
const getAdminEmail = async (admin_id) => {
    try {
        const admin = await config_1.db.collection('Vendor').doc(admin_id).get();
        return admin.data().email;
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in fetching admin email', error: err });
        throw new apiErrorHandler_1.HttpException(500, 'Internal Server Error while getting user Email', 1000);
    }
};
exports.getAdminEmail = getAdminEmail;
// Get total orders which status is shipped
const getTotalShippedOrder = async (vendorId) => {
    try {
        const today = dayjs().format('YYYY-MM-DD');
        const firstDayOfMonth = dayjs().startOf('month').format('YYYY-MM-DD');
        const lastDayOfMonth = dayjs().endOf('month').format('YYYY-MM-DD');
        const totalShippedOrder = await config_1.db.collection('Order').where('vendor_id', '==', vendorId).where('status', '==', 'shipped').where('created_at', '>=', firstDayOfMonth).where('created_at', '<=', lastDayOfMonth).get();
        return totalShippedOrder.size;
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in fetching total shipped order', error: err });
        throw new apiErrorHandler_1.HttpException(500, 'Internal Server Error', 1000);
    }
};
exports.getTotalShippedOrder = getTotalShippedOrder;
// Get total orders which status is delivered
const getTotalDeliveredOrder = async (vendorId) => {
    try {
        const today = dayjs().format('YYYY-MM-DD');
        const firstDayOfMonth = dayjs().startOf('month').format('YYYY-MM-DD');
        const lastDayOfMonth = dayjs().endOf('month').format('YYYY-MM-DD');
        const totalDeliveredOrder = await config_1.db.collection('Order').where('vendor_id', '==', vendorId).where('status', '==', 'delivered').where('created_at', '>=', firstDayOfMonth).where('created_at', '<=', lastDayOfMonth).get();
        return totalDeliveredOrder.size;
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in fetching total delivered order', error: err });
        throw new apiErrorHandler_1.HttpException(500, 'Internal Server Error', 1000);
    }
};
exports.getTotalDeliveredOrder = getTotalDeliveredOrder;
//# sourceMappingURL=dashboard.service.js.map