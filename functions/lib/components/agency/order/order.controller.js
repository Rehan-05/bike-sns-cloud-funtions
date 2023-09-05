"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderByMonth = void 0;
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
//# sourceMappingURL=order.controller.js.map