"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardData = void 0;
const v1_1 = require("firebase-functions/v1");
const service = require("./dashboard.service");
const apiErrorHandler_1 = require("../../../utils/apiErrorHandler");
const getDashboardData = async (req, res, next) => {
    var _a;
    try {
        const vendorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const totalOrder = await service.getTotalOrder(vendorId);
        const vendorEmail = await service.getAdminEmail(req.user.id);
        const latestOrders = await service.getLatestOrders(vendorId);
        const totalShippedOrder = await service.getTotalShippedOrder(vendorId);
        const totalDeliveredOrder = await service.getTotalDeliveredOrder(vendorId);
        res.status(200).json({
            message: "success",
            data: {
                totalOrder,
                vendorEmail,
                totalShippedOrder,
                totalDeliveredOrder,
                latestOrders
            }
        });
    }
    catch (err) {
        if (err instanceof apiErrorHandler_1.HttpException && err.statusCode) {
            return res.status(err.statusCode).json({ message: err.message, error: err.stack });
        }
        v1_1.logger.error({ message: 'error in fetching dashboard data', error: err });
        return res.status(500).json({ message: 'Internal Server Error', error: err });
    }
};
exports.getDashboardData = getDashboardData;
//# sourceMappingURL=dashboard.controller.js.map