"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const express_validator_1 = require("express-validator");
const agency_validation_1 = require("./agency.validation");
const controller = require("./agency.controller");
const validation_1 = require("../../../utils/validation");
const verifyToken_middleware_1 = require("../../../middlewares/verifyToken.middleware");
const router = express.Router();
router.post('', verifyToken_middleware_1.authAdmin, (0, express_validator_1.checkSchema)(agency_validation_1.CREAT_AGENCY), validation_1.checkValidation, controller.createAgency);
router.get('', verifyToken_middleware_1.authAdmin, controller.getAgencies);
router.get('/:agencyId', verifyToken_middleware_1.authAdmin, (0, express_validator_1.checkSchema)(agency_validation_1.AGENCY_ID_SCHEMA), validation_1.checkValidation, controller.getAgencyById);
router.delete('/:agencyId', verifyToken_middleware_1.authAdmin, (0, express_validator_1.checkSchema)(agency_validation_1.AGENCY_ID_SCHEMA), validation_1.checkValidation, controller.deactivateAgency);
router.get('/:agencyId/vendors', verifyToken_middleware_1.authAdmin, (0, express_validator_1.checkSchema)(agency_validation_1.AGENCY_ID_SCHEMA), validation_1.checkValidation, controller.getVendors);
exports.default = router;
//# sourceMappingURL=index.js.map