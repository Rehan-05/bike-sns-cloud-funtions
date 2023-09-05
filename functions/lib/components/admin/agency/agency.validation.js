"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AGENCY_ID_SCHEMA = exports.CREAT_AGENCY = void 0;
const validation_1 = require("../../../constants/validation");
exports.CREAT_AGENCY = {
    email: (0, validation_1.VALIDATION_EMAIL)('body'),
    agencyName: (0, validation_1.VALIDATION_NAME)('body'),
};
exports.AGENCY_ID_SCHEMA = {
    agencyId: (0, validation_1.VALIDATION_AGENCY_ID)("params"),
};
//# sourceMappingURL=agency.validation.js.map