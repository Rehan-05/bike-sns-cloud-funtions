"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controller = require("./dashboard.controller");
const verifyToken_middleware_1 = require("../../../middlewares/verifyToken.middleware");
const router = express.Router();
router.get('', verifyToken_middleware_1.authAgency, controller.getDashboardData);
exports.default = router;
//# sourceMappingURL=index.js.map