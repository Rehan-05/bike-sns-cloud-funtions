"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardData = void 0;
const v1_1 = require("firebase-functions/v1");
const service = require("./dashboard.service");
const getDashboardData = async (req, res, next) => {
    try {
        const totalOrder = await service.getTotalOrder(req.user.id);
        const totalActivatedVendor = await service.getTotalActivatedVendor(req.user.id);
        const latestOrders = await service.getLatestOrders(req.user.id);
        const agencyEmail = await service.getEmail(req.user.id);
        res.status(200).json({
            message: "success",
            data: {
                totalOrder,
                totalActivatedVendor,
                latestOrders,
                agencyEmail
            }
        });
    }
    catch (err) {
        v1_1.logger.error({ message: 'error in fetching dashboard data', error: err });
        next(err);
    }
};
exports.getDashboardData = getDashboardData;
//# sourceMappingURL=dashboard.controller.js.map