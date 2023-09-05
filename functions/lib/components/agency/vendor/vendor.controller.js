"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVendorWithAgencyId = exports.getOrderByMonth = void 0;
const v1_1 = require("firebase-functions/v1");
const service = require("./vendor.service");
const apiErrorHandler_1 = require("../../../utils/apiErrorHandler");
const getOrderByMonth = async (req, res, next) => {
    try {
        const { month } = req.query;
        const { vendorId } = req.params;
        v1_1.logger.info({ message: 'get order by month', month, vendorId });
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        if ((typeof month !== 'string') || !months.includes(month)) {
            throw new apiErrorHandler_1.HttpException(400, 'Bad Request, month is required.', 1000);
        }
        // find index of month
        const monthIndex = months.indexOf(month);
        const totalOrder = await service.getOrderByMonth(monthIndex + 1, vendorId);
        v1_1.logger.info({ message: 'get order by month', totalOrder });
        res.status(200).json({
            message: 'success',
            data: totalOrder,
        });
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in fetching total order', error: err });
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
// get vendor with agency id controller
const getVendorWithAgencyId = async (req, res, next) => {
    try {
        const vendor = await service.getVendorWithAgencyId(req.user.id);
        res.status(200).json({
            message: 'success',
            data: vendor,
        });
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in fetching vendor', error: err });
        if (err instanceof apiErrorHandler_1.HttpException && err.statusCode && err.message) {
            return res.status(err.statusCode).json({
                message: err.message,
                error: err.stack,
            });
        }
        // logger.error({ message: 'error in fetching vendor', error: err });/
        // 500 handle error
        return res.status(500).json({
            message: 'Internal Server Error',
            error: err.stack,
        });
    }
    ;
};
exports.getVendorWithAgencyId = getVendorWithAgencyId;
//# sourceMappingURL=vendor.controller.js.map