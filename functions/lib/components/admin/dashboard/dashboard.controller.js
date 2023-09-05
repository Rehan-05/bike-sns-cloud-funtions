"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listCategories = exports.addBike = exports.listBikes = exports.getUser = exports.listUsers = void 0;
const v1_1 = require("firebase-functions/v1");
const config_1 = require("../../../firebase/config");
const ApiErrorStructure_1 = require("../../../utils/ApiErrorStructure");
const dashboard_message_1 = require("./dashboard.message");
const listUsers = async (req, res, next) => {
    try {
        const users = await config_1.db.collection('Users').get();
        const usersList = [];
        users.forEach((doc) => {
            usersList.push(doc.data());
        });
        res.status(200).json(usersList);
    }
    catch (err) {
        v1_1.logger.error(err);
        return res.status(500).json((0, ApiErrorStructure_1.ERROR)(dashboard_message_1.authMessages.internalServerError, 500, 1007));
    }
};
exports.listUsers = listUsers;
const getUser = async (req, res, next) => {
    try {
        const user = await config_1.db.collection('Users').doc(req.params.id).get();
        if (!user.exists) {
            return res.status(404).json((0, ApiErrorStructure_1.ERROR)(dashboard_message_1.authMessages.notFound, 404, 1008));
        }
        res.status(200).json(user.data());
    }
    catch (err) {
        v1_1.logger.error(err);
        return res.status(500).json((0, ApiErrorStructure_1.ERROR)(dashboard_message_1.authMessages.internalServerError, 500, 1007));
    }
};
exports.getUser = getUser;
const listBikes = async (req, res, next) => {
    try {
        const bikes = await config_1.db.collection('Bikes').get();
        const bikesList = [];
        bikes.forEach((doc) => {
            bikesList.push(doc.data());
        });
        res.status(200).json(bikesList);
    }
    catch (err) {
        v1_1.logger.error(err);
        return res.status(500).json((0, ApiErrorStructure_1.ERROR)(dashboard_message_1.authMessages.internalServerError, 500, 1007));
    }
};
exports.listBikes = listBikes;
const addBike = async (req, res, next) => {
    try {
        const { bikeName, makerName, emission } = req.body;
        if (bikeName && makerName && emission) {
            const bike = await config_1.db.collection('Bikes').add({ bikeName, makerName, emission });
            res.status(200).json(bike);
        }
        else {
            res.status(400).json({ message: 'Bad Request' });
        }
    }
    catch (err) {
        v1_1.logger.error(err);
        return res.status(500).json((0, ApiErrorStructure_1.ERROR)(dashboard_message_1.authMessages.internalServerError, 500, 1007));
    }
};
exports.addBike = addBike;
// Get List of categories (category name, created at, Number of basic post, number of maintaince post) from database
const listCategories = async (req, res, next) => {
    try {
        const categories = await config_1.db.collection('Categories').get();
        const categoriesList = [];
        categories.forEach((doc) => {
            categoriesList.push(doc.data());
        });
        res.status(200).json(categoriesList);
    }
    catch (err) {
        v1_1.logger.error(err);
        return res.status(500).json((0, ApiErrorStructure_1.ERROR)(dashboard_message_1.authMessages.internalServerError, 500, 1007));
    }
};
exports.listCategories = listCategories;
//# sourceMappingURL=dashboard.controller.js.map