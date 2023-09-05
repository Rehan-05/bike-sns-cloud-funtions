"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADDTOURING_SCHEMA = void 0;
const validation_1 = require("../../../constants/validation");
exports.ADDTOURING_SCHEMA = {
    title: (0, validation_1.VALIDATION_TITLE)('body'),
    eventDetail: (0, validation_1.VALIDATION_EVENTDETAIL)('body'),
    destination: (0, validation_1.VALIDATION_DESTINATION)('body'),
    NumberOfAccept: (0, validation_1.VALIDATION_NUMBEROFACCEPT)('body'),
    budget: (0, validation_1.VALIDATION_BUDGET)('body'),
    shareWith: (0, validation_1.VALIDATION_SHAREWITH)('body'),
};
//# sourceMappingURL=touring.validation.js.map