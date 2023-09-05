"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBikes = exports.deleteBike = exports.addBike = void 0;
const v1_1 = require("firebase-functions/v1");
const service = __importStar(require("./bikeServices.service"));
const addBike = async (req, res, next) => {
    try {
        v1_1.logger.info('Add bike request received');
        const { userId } = req.user;
        const { bikeId, ImageUrl } = req.body;
        const newdata = await service.addBike(userId, bikeId, ImageUrl);
        if (newdata === 'success') {
            v1_1.logger.info(`Bike added successfully`);
            res.status(200).json({
                message: 'Bike added successfully',
            });
        }
        else {
            v1_1.logger.info(`Bike not added successfully`);
            res.status(500).json({
                message: 'Something went wrong',
            });
        }
    }
    catch (err) {
        v1_1.logger.error(err);
    }
};
exports.addBike = addBike;
const deleteBike = async (req, res, next) => {
    try {
        v1_1.logger.info('Delete bike request received');
        const { userId } = req.user;
        const { bikeId } = req.params;
        const newdata = await service.deleteBike(userId, bikeId);
        if (newdata === 'success') {
            v1_1.logger.info(`Bike deleted successfully`);
            res.status(200).json({
                message: 'Bike deleted successfully',
            });
        }
        else {
            v1_1.logger.info(`Bike not deleted successfully`);
            res.status(500).json({
                message: 'Something went wrong',
            });
        }
    }
    catch (err) {
        v1_1.logger.error(err);
    }
};
exports.deleteBike = deleteBike;
const getBikes = async (req, res, next) => {
    try {
        v1_1.logger.info('Get bikes request received');
        const { userId } = req.user;
        const newdata = await service.getBikes(userId);
        if (newdata === 'success') {
            v1_1.logger.info(`Bikes fetched successfully`);
            res.status(200).json({
                message: 'Bikes fetched successfully',
            });
        }
        else {
            v1_1.logger.info(`Bikes not fetched successfully`);
            res.status(500).json({
                message: 'Something went wrong',
            });
        }
    }
    catch (err) {
        v1_1.logger.error(err);
    }
};
exports.getBikes = getBikes;
//# sourceMappingURL=bikeServices.controller.js.map