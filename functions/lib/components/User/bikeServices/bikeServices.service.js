"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBikes = exports.deleteBike = exports.addBike = void 0;
const v1_1 = require("firebase-functions/v1");
const config_1 = require("../../../firebase/config");
const apiErrorHandler_1 = require("../../../utils/apiErrorHandler");
const addBike = async (userId, bikeId, ImageUrl) => {
    let error;
    try {
        v1_1.logger.info('Add bike request received');
        const user = await config_1.db.collection('User').doc(userId).get();
        if (!user.exists) {
            v1_1.logger.info('User not found');
            return Promise.reject((0, apiErrorHandler_1.pageNoFoundException)('User not found'));
        }
        const bike = await config_1.db.collection('Bikes').doc(bikeId).get();
        if (!bike.exists) {
            v1_1.logger.info('Bike not found');
            return Promise.reject((0, apiErrorHandler_1.pageNoFoundException)('Bike not found'));
        }
        const newdata = await config_1.db.collection('User').doc(userId).update({
            bike: bikeId,
            bikeImage: ImageUrl,
        });
        v1_1.logger.info(`Bike added successfully`);
        return Promise.resolve('success');
    }
    catch (err) {
        error = err instanceof Error ? err : (0, apiErrorHandler_1.badImplementationException)(err);
    }
};
exports.addBike = addBike;
const deleteBike = async (userId, bikeId) => {
    let error;
    try {
        v1_1.logger.info('Delete bike request received');
        const user = await config_1.db.collection('User').doc(userId).get();
        if (!user.exists) {
            v1_1.logger.info('User not found');
            return Promise.reject((0, apiErrorHandler_1.pageNoFoundException)('User not found'));
        }
        const bike = await config_1.db.collection('Bikes').doc(bikeId).get();
        if (!bike.exists) {
            v1_1.logger.info('Bike not found');
            return Promise.reject((0, apiErrorHandler_1.pageNoFoundException)('Bike not found'));
        }
        const newdata = await config_1.db.collection('User').doc(userId).update({
            bike: '',
            bikeImage: '',
        });
        v1_1.logger.info(`Bike deleted successfully`);
        return Promise.resolve('success');
    }
    catch (err) {
        error = err instanceof Error ? err : (0, apiErrorHandler_1.badImplementationException)(err);
    }
};
exports.deleteBike = deleteBike;
const getBikes = async (userId) => {
    let error;
    try {
        v1_1.logger.info('Get bikes request received');
        const user = await config_1.db.collection('User').doc(userId).get();
        if (!user.exists) {
            v1_1.logger.info('User not found');
            return Promise.reject((0, apiErrorHandler_1.pageNoFoundException)('User not found'));
        }
        const bikes = await config_1.db.collection('Bikes').get();
        const bikeList = [];
        bikes.forEach((doc) => {
            bikeList.push(doc.data());
        });
        v1_1.logger.info(`Bikes fetched successfully`);
        return Promise.resolve(bikeList);
    }
    catch (err) {
        error = err instanceof Error ? err : (0, apiErrorHandler_1.badImplementationException)(err);
    }
};
exports.getBikes = getBikes;
//# sourceMappingURL=bikeServices.service.js.map