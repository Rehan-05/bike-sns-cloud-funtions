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
const dashboard_validation_1 = require("./dashboard.validation");
const controller = __importStar(require("./dashboard.controller"));
const validation_1 = require("../../../utils/validation");
const verifyToken_middleware_1 = require("../../../middlewares/verifyToken.middleware");
const router = express.Router();
router.get('/listOfUser', verifyToken_middleware_1.authAdmin, controller.listUsers);
router.get('/user/:id', verifyToken_middleware_1.authAdmin, (0, express_validator_1.checkSchema)(dashboard_validation_1.GETUSER_SCHEMA), validation_1.checkValidation, controller.getUser);
router.get('/listOfBikes', verifyToken_middleware_1.authAdmin, controller.listBikes);
router.post('/addBike', verifyToken_middleware_1.authAdmin, (0, express_validator_1.checkSchema)(dashboard_validation_1.ADD_BIKE_SCHEMA), validation_1.checkValidation, controller.addBike);
router.get('/listCategories', verifyToken_middleware_1.authAdmin, controller.listCategories);
exports.default = router;
//# sourceMappingURL=index.js.map