"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrderStatus = exports.getTotalOrder = void 0;
const dayjs = require("dayjs");
const v1_1 = require("firebase-functions/v1");
const config_1 = require("../../../firebase/config");
const apiErrorHandler_1 = require("../../../utils/apiErrorHandler");
// create a function that get total order of this month
const getTotalOrder = async (month) => {
    try {
        const year = dayjs().year();
        // 
        let today = year + '-' + month + '-' + '01';
        const firstDayOfMonth = dayjs(today).startOf('month').format('YYYY-MM-DD');
        const lastDayOfMonth = dayjs(today).endOf('month').format('YYYY-MM-DD');
        const totalOrder = await config_1.db.collection('Order').where('created_at', '>=', firstDayOfMonth).where('created_at', '<=', lastDayOfMonth).get();
        // return all orders
        return totalOrder.docs.map((doc) => (Object.assign({ id: doc.id }, doc.data())));
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in fetching total order', error: err });
        throw new apiErrorHandler_1.HttpException(500, 'Internal Server Error', 1000);
    }
};
exports.getTotalOrder = getTotalOrder;
// create a function that will update order status
const updateOrderStatus = async (orderId, status) => {
    try {
        // find order by id
        const order = await config_1.db.collection('Order').where('order_id', '==', orderId).get();
        // if order not found
        if (order.empty) {
            throw new apiErrorHandler_1.HttpException(404, 'Order not found', 1000);
        }
        // update order status
        let updatedPrder = await config_1.db.collection('Order').doc(order.docs[0].id).update({ status, updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss') });
        // return updated order
        return { id: order.docs[0].id, };
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in updating order status', error: err });
        if (err instanceof apiErrorHandler_1.HttpException) {
            throw err;
        }
        throw new apiErrorHandler_1.HttpException(500, 'Internal Server Error', 1000);
    }
};
exports.updateOrderStatus = updateOrderStatus;
//# sourceMappingURL=order.service.js.map