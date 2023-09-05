"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerComponents = void 0;
// import { createAdminUser } from './admin/auth/auth.service';
const components_1 = __importDefault(require("./components"));
const registerComponents = (app) => {
    app.use('/api', components_1.default);
    app.on('listening', () => {
        console.info('Listening on port 5000');
    });
    app.get('/', (req, res, next) => {
        const { isError } = req.query;
        if (!isError)
            res.status(200).json('Hello World');
        else
            next(new Error('Testing error handling'));
    });
};
exports.registerComponents = registerComponents;
//# sourceMappingURL=index.js.map