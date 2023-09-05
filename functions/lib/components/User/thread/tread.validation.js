"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADDTWEETTHREAD_SCHEMA = void 0;
const validation_1 = require("../../../constants/validation");
exports.ADDTWEETTHREAD_SCHEMA = {
    postText: (0, validation_1.VALIDATION_POST_TEXT)('body'),
    postImage: (0, validation_1.VALIDATION_POST_IMAGE)('body'),
    userImage: (0, validation_1.VALIDATION_USER_IMAGE)('body'),
    nickName: (0, validation_1.VALIDATION_NICK_NAME)('body'),
};
//# sourceMappingURL=tread.validation.js.map