"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADDTOURING_SCHEMA = exports.ADDPOST_SCHEMA = exports.EDITPOST_SCHEMA = exports.PROFILEDATA_SCHEMA = void 0;
const validation_1 = require("../../../constants/validation");
// user id validation
exports.PROFILEDATA_SCHEMA = {
    uid: (0, validation_1.VALIDATION_ID)('params'),
};
exports.EDITPOST_SCHEMA = {
    postId: (0, validation_1.VALIDATION_ID)('params'),
};
exports.ADDPOST_SCHEMA = {
    title: (0, validation_1.VALIDATION_TITLE)('body'),
    category: (0, validation_1.VALIDATION_CATEGORY)('body'),
    tag: (0, validation_1.VALIDATION_TAG)('body'),
    bike: (0, validation_1.VALIDATION_BIKE)('body'),
    image: (0, validation_1.VALIDATION_IMAGE)('body'),
};
exports.ADDTOURING_SCHEMA = {
    title: (0, validation_1.VALIDATION_TITLE)('body'),
    eventDetail: (0, validation_1.VALIDATION_EVENTDETAIL)('body'),
    destination: (0, validation_1.VALIDATION_DESTINATION)('body'),
    NumberOfAccept: (0, validation_1.VALIDATION_NUMBEROFACCEPT)('body'),
    budget: (0, validation_1.VALIDATION_BUDGET)('body'),
    shareWith: (0, validation_1.VALIDATION_SHAREWITH)('body'),
};
//# sourceMappingURL=myProfile.validation.js.map