"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVendors = exports.deactivateAgency = exports.getAgencyById = exports.getAgencies = exports.createAgency = void 0;
const v1_1 = require("firebase-functions/v1");
const service = require("./agency.service");
const ApiErrorStructure_1 = require("../../../utils/ApiErrorStructure");
const agency_message_1 = require("./agency.message");
const apiErrorHandler_1 = require("../../../utils/apiErrorHandler");
const createAgency = async (req, res, next) => {
    try {
        v1_1.logger.info('Login request received');
        const { email, agencyName } = req.body;
        const password = service.generatePassword();
        const { user, agency } = await service.createAgency(email, agencyName, password);
        // when agency created send email to agency with password
        await service.sendEmail(email, password);
        res.status(200).json({
            message: agency_message_1.agencyMessages.AGENCY_CREATED,
        });
    }
    catch (err) {
        v1_1.logger.error(err);
        // handle thrown errors
        if (err instanceof apiErrorHandler_1.HttpException && err.statusCode && err.subStatusCode) {
            return res.status(err.statusCode).json((0, ApiErrorStructure_1.ERROR)(err.message, err.statusCode, err.subStatusCode));
        }
        // handle unexpected errors
        return next((0, apiErrorHandler_1.badImplementationException)(err));
    }
};
exports.createAgency = createAgency;
const getAgencies = async (req, res, next) => {
    try {
        console.info("get agencies");
        const agencies = await service.getAllAgency();
        res.status(200).json({ message: "successfully fetched agencies", data: agencies });
    }
    catch (err) {
        v1_1.logger.error({ message: "error in fetching agencies", error: err });
        if (err instanceof apiErrorHandler_1.HttpException && err.statusCode && err.subStatusCode) {
            return res.status(err.statusCode).json((0, ApiErrorStructure_1.ERROR)(err.message, err.statusCode, err.subStatusCode));
        }
        // handle unexpected errors 500
        return res.status(500).json((0, ApiErrorStructure_1.ERROR)("Internal Server Error", 500, 1000));
    }
};
exports.getAgencies = getAgencies;
const getAgencyById = async (req, res, next) => {
    try {
        v1_1.logger.info("get agency by id");
        const agencyId = req.params.agencyId;
        const agency = await service.getAgencyById(agencyId);
        res.status(200).json({ message: "successfully fetched agency", data: agency });
    }
    catch (err) {
        v1_1.logger.error(err);
        if (err instanceof apiErrorHandler_1.HttpException && err.statusCode && err.subStatusCode) {
            return res.status(err.statusCode).json((0, ApiErrorStructure_1.ERROR)(err.message, err.statusCode, err.subStatusCode));
        }
        // handle unexpected errors 500
        return res.status(500).json((0, ApiErrorStructure_1.ERROR)("Internal Server Error", 500, 1000));
    }
};
exports.getAgencyById = getAgencyById;
const deactivateAgency = async (req, res, next) => {
    try {
        v1_1.logger.info("deactivate agency");
        const agencyId = req.params.agencyId;
        const agency = await service.deActivateAgency(agencyId);
        v1_1.logger.info("agency deactivated");
        res.status(200).json({ message: "successfully deactivated agency", data: agency });
    }
    catch (err) {
        v1_1.logger.error(err);
        if (err instanceof apiErrorHandler_1.HttpException && err.statusCode && err.subStatusCode) {
            return res.status(err.statusCode).json((0, ApiErrorStructure_1.ERROR)(err.message, err.statusCode, err.subStatusCode));
        }
        // handle unexpected errors 500
        return res.status(500).json((0, ApiErrorStructure_1.ERROR)("Internal Server Error", 500, 1000));
    }
};
exports.deactivateAgency = deactivateAgency;
const getVendors = async (req, res, next) => {
    try {
        v1_1.logger.info("get vendors by agency id");
        const agencyId = req.params.agencyId;
        const vendors = await service.getAllVendors(agencyId);
        res.status(200).json({ message: "successfully fetched vendors", data: vendors });
    }
    catch (err) {
        v1_1.logger.error(err);
        if (err instanceof apiErrorHandler_1.HttpException && err.statusCode && err.subStatusCode) {
            return res.status(err.statusCode).json((0, ApiErrorStructure_1.ERROR)(err.message, err.statusCode, err.subStatusCode));
        }
        // handle unexpected errors 500
        return res.status(500).json((0, ApiErrorStructure_1.ERROR)("Internal Server Error", 500, 1000));
    }
};
exports.getVendors = getVendors;
//# sourceMappingURL=agency.controller.js.map