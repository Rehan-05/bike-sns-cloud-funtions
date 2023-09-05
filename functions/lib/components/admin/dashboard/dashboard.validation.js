"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADD_BIKE_SCHEMA = exports.GETUSER_SCHEMA = void 0;
const validation_1 = require("../../../constants/validation");
exports.GETUSER_SCHEMA = {
    id: (0, validation_1.VALIDATION_USER_ID)('params'),
};
exports.ADD_BIKE_SCHEMA = {
    bikeName: (0, validation_1.VALIDATION_BIKE_NAME)('body'),
    makerName: (0, validation_1.VALIDATION_MAKER_NAME)('body'),
    emission: (0, validation_1.VALIDATION_EMISSION_STANDARD)('body'),
};
//# sourceMappingURL=dashboard.validation.js.map