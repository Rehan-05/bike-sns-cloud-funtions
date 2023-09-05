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
const myProfile_validation_1 = require("./myProfile.validation");
const controller = __importStar(require("./myProfile.controller"));
const validation_1 = require("../../../utils/validation");
const verifyToken_middleware_1 = require("../../../middlewares/verifyToken.middleware");
// import { isUser } from '../../../utils/auth';
const router = express.Router();
router.get('/profileData/:uid', (0, express_validator_1.checkSchema)(myProfile_validation_1.PROFILEDATA_SCHEMA), validation_1.checkValidation, verifyToken_middleware_1.authUser, controller.getProfileData);
router.put('/update/editPost/:postId', (0, express_validator_1.checkSchema)(myProfile_validation_1.EDITPOST_SCHEMA), validation_1.checkValidation, verifyToken_middleware_1.authUser, controller.editDailyPost);
router.post('/addPost', (0, express_validator_1.checkSchema)(myProfile_validation_1.ADDPOST_SCHEMA), validation_1.checkValidation, verifyToken_middleware_1.authUser, controller.dailyPost);
router.post('/addTouringEvent', (0, express_validator_1.checkSchema)(myProfile_validation_1.ADDTOURING_SCHEMA), validation_1.checkValidation, verifyToken_middleware_1.authUser, controller.addTouringEvent);
router.get('/touringList', verifyToken_middleware_1.authUser, controller.touringList);
router.get('/touringUserList', verifyToken_middleware_1.authUser, validation_1.checkValidation, controller.touringUserList);
exports.default = router;
//# sourceMappingURL=index.js.map