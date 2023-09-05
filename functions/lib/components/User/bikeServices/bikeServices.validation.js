"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADD_BIKE_SCHEMA = void 0;
const validation_1 = require("../../../constants/validation");
exports.ADD_BIKE_SCHEMA = {
    bikeId: (0, validation_1.VALIDATION_BIKE)('body'),
    ImageUrl: (0, validation_1.VALIDATION_IMAGEURL)('body'),
};
//# sourceMappingURL=bikeServices.validation.js.map