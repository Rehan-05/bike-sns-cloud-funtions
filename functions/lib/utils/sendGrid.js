"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const mail_1 = __importDefault(require("@sendgrid/mail"));
const v1_1 = require("firebase-functions/v1");
const SEND_GRID = process.env.SEND_GRID_API_KEY;
mail_1.default.setApiKey(SEND_GRID);
const sendMessage = async (message) => {
    try {
        await mail_1.default.send(message);
        v1_1.logger.info('Email was sent.');
        return Promise.resolve();
    }
    catch (err) {
        v1_1.logger.error(err);
        return Promise.reject(err);
    }
};
exports.sendMessage = sendMessage;
//# sourceMappingURL=sendGrid.js.map