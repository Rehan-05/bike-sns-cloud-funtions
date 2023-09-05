"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePassword = void 0;
const config_1 = require("../../../firebase/config");
const apiErrorHandler_1 = require("../../../utils/apiErrorHandler");
const auth_1 = require("firebase/auth");
const UpdatePassword = async (email, password, newPassword) => {
    let error;
    let user;
    try {
        user = await (0, auth_1.signInWithEmailAndPassword)(config_1.auth, email, password);
        await (0, auth_1.updatePassword)(user.user, newPassword);
    }
    catch (err) {
        throw new apiErrorHandler_1.HttpException(400, err.message, 1000);
    }
};
exports.UpdatePassword = UpdatePassword;
//# sourceMappingURL=account.service.js.map