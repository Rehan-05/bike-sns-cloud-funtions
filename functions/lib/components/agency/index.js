"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const auth_1 = require("./auth");
const vendor_1 = require("./vendor");
const order_1 = require("./order");
const account_1 = require("./account");
const dashboard_1 = require("./dashboard");
const router = express.Router();
router.use('', auth_1.default);
router.use('/vendors', vendor_1.default);
router.use('/orders', order_1.default);
router.use('/account', account_1.default);
router.use('/dashboard', dashboard_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map