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
const express = __importStar(require("express"));
const express_validator_1 = require("express-validator");
const bikeServices_validation_1 = require("./bikeServices.validation");
const controller = __importStar(require("./bikeServices.controller"));
const validation_1 = require("../../../utils/validation");
const verifyToken_middleware_1 = require("../../../middlewares/verifyToken.middleware");
// import { isUser } from '../../../utils/auth';
const router = express.Router();
router.post('/users/:userId/bikes', verifyToken_middleware_1.authUser, (0, express_validator_1.checkSchema)({ ADD_BIKE_SCHEMA: bikeServices_validation_1.ADD_BIKE_SCHEMA }), validation_1.checkValidation, controller.addBike);
router.delete('/users/:userId/bikes/:bikeId', verifyToken_middleware_1.authUser, controller.deleteBike);
router.get('/users/:userId/bikes', verifyToken_middleware_1.authUser, controller.getBikes);
exports.default = router;
//# sourceMappingURL=index.js.map