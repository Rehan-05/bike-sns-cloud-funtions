"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardData = void 0;
const v1_1 = require("firebase-functions/v1");
const service = require("./dashboard.service");
const getDashboardData = async (req, res, next) => {
    try {
        const totalOrder = await service.getTotalOrder();
        const totalActivatedAgency = await service.getTotalActivatedAgency();
        const totalActivatedVendor = await service.getTotalActivatedVendor();
        const latestOrders = await service.getLatestOrders();
        const adminEmail = await service.getAdminEmail(req.user.id);
        const totalDeliveredOrders = await service.getTotalDeliveredOrders();
        const totalNotDeliveredOrders = await service.getTotalNotDeliveredOrders();
        res.status(200).json({
            message: "success",
            data: {
                totalOrder,
                totalActivatedAgency,
                totalActivatedVendor,
                latestOrders,
                adminEmail,
                totalDeliveredOrders,
                totalNotDeliveredOrders,
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