"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = exports.not_delivered = exports.deliverOrder = exports.getOrderByMonth = void 0;
const v1_1 = require("firebase-functions/v1");
const service = require("./order.service");
const apiErrorHandler_1 = require("../../../utils/apiErrorHandler");
const getOrderByMonth = async (req, res, next) => {
    try {
        const { month } = req.query;
        // month must be a string in English month
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        if ((typeof month !== 'string') || !months.includes(month)) {
            throw new apiErrorHandler_1.HttpException(400, 'Bad Request, month is required.', 1000);
        }
        // find index of month
        const monthIndex = months.indexOf(month);
        const totalOrder = await service.getTotalOrder(monthIndex + 1, req.user.id);
        res.status(200).json({
            message: 'success',
            data: totalOrder,
        });
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in fetching dashboard data', error: err });
        if (err instanceof apiErrorHandler_1.HttpException && err.statusCode && err.message) {
            return res.status(err.statusCode).json({
                message: err.message,
                error: err.stack,
            });
        }
    }
    ;
};
exports.getOrderByMonth = getOrderByMonth;
const deliverOrder = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        v1_1.logger.info({ message: 'deliver order', orderId });
        const order = await service.updateOrderStatus(orderId, 'delivered');
        v1_1.logger.info({ message: 'order delivered', orderId });
        res.status(200).json({
            message: 'success order delivered',
            data: order,
        });
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in delivering order', error: err });
        if (err instanceof apiErrorHandler_1.HttpException && err.statusCode && err.message) {
            return res.status(err.statusCode).json({
                message: err.message,
            });
        }
    }
    ;
};
exports.deliverOrder = deliverOrder;
const not_delivered = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        v1_1.logger.info({ message: 'not delivered order', orderId });
        const order = await service.updateOrderStatus(orderId, 'not_delivered');
        v1_1.logger.info({ message: 'order not delivered', orderId });
        res.status(200).json({
            message: 'changed  status to not delivered',
            data: order,
        });
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in not delivered order', error: err });
        if (err instanceof apiErrorHandler_1.HttpException && err.statusCode && err.message) {
            return res.status(err.statusCode).json({
                message: err.message,
            });
        }
    }
    ;
};
exports.not_delivered = not_delivered;
const createOrder = async (req, res, next) => {
    try {
        const { number, order_date } = req.body;
        v1_1.logger.info({ message: 'create order' });
        const order = await service.createOrder(number, req.user.id, order_date);
        v1_1.logger.info({ message: 'order created', order: order.id });
        res.status(200).json({
            message: 'success',
            data: order,
        });
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in creating order', error: err });
        if (err instanceof apiErrorHandler_1.HttpException && err.statusCode && err.message) {
            return res.status(err.statusCode).json({
                message: err.message,
                error: err.stack,
            });
        }
    }
    ;
};
exports.createOrder = createOrder;
//# sourceMappingURL=order.controller.js.map