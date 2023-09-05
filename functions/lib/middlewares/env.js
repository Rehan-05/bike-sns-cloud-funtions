"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.IS_PRODUCTION = void 0;
const ENVIRONMENT = process.env.NODE_ENV;
exports.IS_PRODUCTION = ENVIRONMENT === 'production';
if (!process.env.JWT_SECRET) {
    console.warn('JWT_SECRET IS UNDEFINED AT ENV FILE');
    process.exit(1);
}
const JWT_SECRET = process.env.JWT_SECRET;
exports.JWT_SECRET = JWT_SECRET;
//# sourceMappingURL=env.js.map