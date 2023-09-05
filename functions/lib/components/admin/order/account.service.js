"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTotalDeliveredOrders = exports.getTotalNotDeliveredOrders = exports.getAdminEmail = exports.getLatestOrders = exports.getTotalActivatedVendor = exports.getTotalActivatedAgency = exports.getTotalOrder = void 0;
const dayjs = require("dayjs");
const v1_1 = require("firebase-functions/v1");
const config_1 = require("../../../firebase/config");
const apiErrorHandler_1 = require("../../../utils/apiErrorHandler");
// create a function that get total order of this month 
const getTotalOrder = async () => {
    try {
        const today = dayjs().format('YYYY-MM-DD');
        const firstDayOfMonth = dayjs().startOf('month').format('YYYY-MM-DD');
        const lastDayOfMonth = dayjs().endOf('month').format('YYYY-MM-DD');
        const totalOrder = await config_1.db.collection('orders').where('createdAt', '>=', firstDayOfMonth).where('createdAt', '<=', lastDayOfMonth).get();
        return totalOrder.size;
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in fetching total order', error: err });
        throw new apiErrorHandler_1.HttpException(500, 'Internal Server Error', 1000);
    }
};
exports.getTotalOrder = getTotalOrder;
// get total activated agency
const getTotalActivatedAgency = async () => {
    try {
        const totalActivatedAgency = await config_1.db.collection('agencies').where('status', '==', 'active').get();
        return totalActivatedAgency.size;
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in fetching total activated agency', error: err });
        throw new apiErrorHandler_1.HttpException(500, 'Internal Server Error', 1000);
    }
};
exports.getTotalActivatedAgency = getTotalActivatedAgency;
// get total activated vendor
const getTotalActivatedVendor = async () => {
    try {
        const totalActivatedVendor = await config_1.db.collection('vendors').where('status', '==', 'active').get();
        return totalActivatedVendor.size;
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in fetching total activated vendor', error: err });
        throw new apiErrorHandler_1.HttpException(500, 'Internal Server Error', 1000);
    }
};
exports.getTotalActivatedVendor = getTotalActivatedVendor;
// get latest 5 orders
const getLatestOrders = async () => {
    try {
        const today = dayjs().format('YYYY-MM-DD');
        const firstDayOfMonth = dayjs().startOf('month').format('YYYY-MM-DD');
        const lastDayOfMonth = dayjs().endOf('month').format('YYYY-MM-DD');
        const latestOrders = await config_1.db.collection('orders').where('createdAt', '>=', firstDayOfMonth).where('createdAt', '<=', lastDayOfMonth).orderBy('createdAt', 'desc').limit(5).get();
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
        const admin = await config_1.adminauth.getUser(admin_id);
        return admin.email;
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in fetching admin email', error: err });
        throw new apiErrorHandler_1.HttpException(500, 'Internal Server Error', 1000);
    }
};
exports.getAdminEmail = getAdminEmail;
// Get total not_delivered orders
const getTotalNotDeliveredOrders = async () => {
    try {
        const totalNotDeliveredOrders = await config_1.db.collection('Order').where('status', '==', 'not_delivered').get();
        return totalNotDeliveredOrders.size;
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in fetching total not delivered orders', error: err });
        throw new apiErrorHandler_1.HttpException(500, 'Internal Server Error', 1000);
    }
};
exports.getTotalNotDeliveredOrders = getTotalNotDeliveredOrders;
// Get total delivered orders
const getTotalDeliveredOrders = async () => {
    try {
        const totalDeliveredOrders = await config_1.db.collection('Order').where('status', '==', 'delivered').get();
        return totalDeliveredOrders.size;
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in fetching total delivered orders', error: err });
        throw new apiErrorHandler_1.HttpException(500, 'Internal Server Error', 1000);
    }
};
exports.getTotalDeliveredOrders = getTotalDeliveredOrders;
//# sourceMappingURL=account.service.js.map