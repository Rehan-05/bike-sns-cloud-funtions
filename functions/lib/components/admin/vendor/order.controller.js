"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shipOrder = exports.deliverOrder = exports.cancelOrder = exports.getOrderByMonth = void 0;
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
        const totalOrder = await service.getTotalOrder(month);
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
// update order status to cancelled
const cancelOrder = async (req, res, next) => {
    try {
        const { order_id } = req.params;
        v1_1.logger.info({ message: 'cancel order', order_id });
        const order = await service.updateOrderStatus(order_id, 'cancelled');
        v1_1.logger.info({ message: 'order cancelled', order_id });
        res.status(200).json({
            message: 'success',
            data: order,
        });
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in cancelling order', error: err });
        if (err instanceof apiErrorHandler_1.HttpException && err.statusCode && err.message) {
            return res.status(err.statusCode).json({
                message: err.message,
                error: err.stack,
            });
        }
    }
    ;
};
exports.cancelOrder = cancelOrder;
const deliverOrder = async (req, res, next) => {
    try {
        const { order_id } = req.params;
        v1_1.logger.info({ message: 'deliver order', order_id });
        const order = await service.updateOrderStatus(order_id, 'delivered');
        v1_1.logger.info({ message: 'order delivered', order_id });
        res.status(200).json({
            message: 'success',
            data: order,
        });
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in delivering order', error: err });
        if (err instanceof apiErrorHandler_1.HttpException && err.statusCode && err.message) {
            return res.status(err.statusCode).json({
                message: err.message,
                error: err.stack,
            });
        }
    }
    ;
};
exports.deliverOrder = deliverOrder;
const shipOrder = async (req, res, next) => {
    try {
        const { order_id } = req.params;
        v1_1.logger.info({ message: 'ship order', order_id });
        const order = await service.updateOrderStatus(order_id, 'shipped');
        v1_1.logger.info({ message: 'order shipped', order_id });
        res.status(200).json({
            message: 'success',
            data: order,
        });
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in shipping order', error: err });
        if (err instanceof apiErrorHandler_1.HttpException && err.statusCode && err.message) {
            return res.status(err.statusCode).json({
                message: err.message,
                error: err.stack,
            });
        }
    }
    ;
};
exports.shipOrder = shipOrder;
//# sourceMappingURL=order.controller.js.map