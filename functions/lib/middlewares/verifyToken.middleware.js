"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authUser = exports.authAdmin = void 0;
const jwt_1 = require("../utils/jwt");
const ApiErrorStructure_1 = require("../utils/ApiErrorStructure");
const auth_message_1 = require("../components/admin/auth/auth.message");
const config_1 = require("../firebase/config");
const v1_1 = require("firebase-functions/v1");
// create a new middleware function to verify a token
const authAdmin = async (req, res, next) => {
    const bearer = req.headers['authorization'];
    // bearer token
    console.log(bearer);
    if (!bearer) {
        v1_1.logger.error('No token provided');
        return res.status(403).json((0, ApiErrorStructure_1.ERROR)('access Token is not valid', 403, 1008));
    }
    try {
        const token = bearer.split(' ')[1];
        const decoded = await (0, jwt_1.decodeJwt)(token);
        // check is token expired
        req.user = decoded.payload;
        // check if the user is admin
        console.log(decoded.payload.id);
        const isAdmin = await config_1.db.collection('Admin').doc(decoded === null || decoded === void 0 ? void 0 : decoded.payload.id).get();
        if (!isAdmin.exists || isAdmin.data().status !== 'active') {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(auth_message_1.authMessages.notAdmin, 401, 1003));
        }
        next();
    }
    catch (err) {
        // handle jwt error
        v1_1.logger.error('error', err);
        // if there is firebase error then hanlde that
        //  Error: Value for argument \"documentPath\" is not a valid resource path
        //  . Path must be a non-empty string.
        // handle firebase error
        if (err.code === 400) {
            return res.status(400).json((0, ApiErrorStructure_1.ERROR)(err.message, 400, 1004));
        }
        return res.status(401).json((0, ApiErrorStructure_1.ERROR)(err, 401, 1009));
    }
};
exports.authAdmin = authAdmin;
const authUser = async (req, res, next) => {
    const bearer = req.headers['authorization'];
    // bearer token
    console.log('middleware bearer token', bearer);
    if (!bearer) {
        v1_1.logger.error('No token provided');
        return res.status(403).json((0, ApiErrorStructure_1.ERROR)('access Token is not valid', 403, 1008));
    }
    try {
        const token = bearer.split(' ')[1];
        const decoded = await (0, jwt_1.decodeJwt)(token);
        // check is token expired
        req.user = decoded.payload;
        const isUser = await config_1.db.collection('User').doc(decoded === null || decoded === void 0 ? void 0 : decoded.payload.id).get();
        if (!isUser.exists) {
            return res.status(401).json((0, ApiErrorStructure_1.ERROR)(auth_message_1.authMessages.notAdmin, 401, 1003));
        }
        next();
    }
    catch (err) {
        v1_1.logger.error('error', err);
        if (err.code === 400) {
            return res.status(400).json((0, ApiErrorStructure_1.ERROR)(err.message, 400, 1004));
        }
        return res.status(401).json((0, ApiErrorStructure_1.ERROR)(err, 401, 1009));
    }
};
exports.authUser = authUser;
//# sourceMappingURL=verifyToken.middleware.js.map