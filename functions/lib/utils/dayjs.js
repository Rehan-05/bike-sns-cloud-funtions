"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSame = exports.getSpecificMonth = exports.getTimeDifference = exports.compareAIsSameOrBeforeTimeB = exports.compareAIsBeforeTimeB = exports.compareAIsSameOrAfterB = exports.compareAIsAfterB = exports.getCurrentTime = exports.getNextMonth = exports.getNextDay = exports.get1msAfter = exports.get1msBefore = exports.getEndOf = exports.getStartOf = exports.getTime = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
const rules_1 = require("../constants/rules");
const apiErrorHandler_1 = require("./apiErrorHandler");
const timezone_1 = __importDefault(require("dayjs/plugin/timezone"));
const utc_1 = __importDefault(require("dayjs/plugin/utc"));
const isBetween_1 = __importDefault(require("dayjs/plugin/isBetween"));
const isSameOrAfter_1 = __importDefault(require("dayjs/plugin/isSameOrAfter"));
const isSameOrBefore_1 = __importDefault(require("dayjs/plugin/isSameOrBefore"));
dayjs_1.default.extend(timezone_1.default);
dayjs_1.default.extend(utc_1.default);
dayjs_1.default.extend(isBetween_1.default);
dayjs_1.default.extend(isSameOrAfter_1.default);
dayjs_1.default.extend(isSameOrBefore_1.default);
const getTime = (time, keepLocalTime) => {
    const dayTime = keepLocalTime ? (0, dayjs_1.default)(time).tz(rules_1.TIMEZONE, true) : (0, dayjs_1.default)(time).tz(rules_1.TIMEZONE);
    return dayTime;
};
exports.getTime = getTime;
const getStartOf = (time, unit, keepLocalTime) => {
    const dayTime = (0, exports.getTime)(time, keepLocalTime);
    const startOf = dayTime.startOf(unit);
    return startOf;
};
exports.getStartOf = getStartOf;
const getEndOf = (time, unit, keepLocalTime) => {
    const dayTime = (0, exports.getTime)(time, keepLocalTime);
    return dayTime.endOf(unit);
};
exports.getEndOf = getEndOf;
const get1msBefore = (time, keepLocalTime) => {
    const dayTime = (0, exports.getTime)(time, keepLocalTime);
    return dayTime.subtract(1, 'millisecond');
};
exports.get1msBefore = get1msBefore;
const get1msAfter = (time, keepLocalTime) => {
    const dayTime = (0, exports.getTime)(time, keepLocalTime);
    return dayTime.add(1, 'millisecond');
};
exports.get1msAfter = get1msAfter;
const getNextDay = (time, keepLocalTime) => {
    const dayTime = (0, exports.getTime)(time, keepLocalTime);
    const endOfDay = dayTime.endOf('day');
    return endOfDay.add(1, 'millisecond');
};
exports.getNextDay = getNextDay;
const getNextMonth = (time, keepLocalTime) => {
    const dayTime = (0, exports.getTime)(time, keepLocalTime);
    const endOfMonth = dayTime.endOf('month');
    return endOfMonth.add(1, 'millisecond');
};
exports.getNextMonth = getNextMonth;
const getCurrentTime = (keepLocalTime) => {
    const dayCurrentTime = (0, exports.getTime)(undefined, keepLocalTime);
    return dayCurrentTime;
};
exports.getCurrentTime = getCurrentTime;
const compareAIsAfterB = (time1, time2, keepLocalTime) => {
    const dayTime1 = (0, exports.getTime)(time1, keepLocalTime);
    const dayTime2 = (0, exports.getTime)(time2, keepLocalTime);
    return dayTime1.isAfter(dayTime2);
};
exports.compareAIsAfterB = compareAIsAfterB;
const compareAIsSameOrAfterB = (time1, time2, keepLocalTime) => {
    const dayTime1 = (0, exports.getTime)(time1, keepLocalTime);
    const dayTime2 = (0, exports.getTime)(time2, keepLocalTime);
    return dayTime1.isSameOrAfter(dayTime2);
};
exports.compareAIsSameOrAfterB = compareAIsSameOrAfterB;
const compareAIsBeforeTimeB = (time1, time2, keepLocalTime) => {
    const dayTime1 = (0, exports.getTime)(time1, keepLocalTime);
    const dayTime2 = (0, exports.getTime)(time2, keepLocalTime);
    return dayTime1.isBefore(dayTime2);
};
exports.compareAIsBeforeTimeB = compareAIsBeforeTimeB;
const compareAIsSameOrBeforeTimeB = (time1, time2, keepLocalTime) => {
    const dayTime1 = (0, exports.getTime)(time1, keepLocalTime);
    const dayTime2 = (0, exports.getTime)(time2, keepLocalTime);
    return dayTime1.isSameOrBefore(dayTime2);
};
exports.compareAIsSameOrBeforeTimeB = compareAIsSameOrBeforeTimeB;
/**
 *
 * @param time1 bigger than time2
 * @param time2 bigger than time1
 * @param {QUnitType | OpUnitType} unit
 * @param {boolean} keepLocalTime
 * @returns
 */
const getTimeDifference = (time1, time2, unit, keepLocalTime) => {
    const dayTime1 = (0, exports.getTime)(time1, keepLocalTime);
    const dayTime2 = (0, exports.getTime)(time2, keepLocalTime);
    const diff = dayTime1.diff(dayTime2, unit, true);
    if (diff < 0)
        throw (0, apiErrorHandler_1.badImplementationException)(new Error('time2 should be bigger than time1'));
    return diff;
};
exports.getTimeDifference = getTimeDifference;
const getSpecificMonth = (month) => {
    const index = rules_1.MONTHS.indexOf(month);
    if (index === -1)
        throw (0, apiErrorHandler_1.validationException)(new Error('You must send month in English'));
    return (0, dayjs_1.default)().tz(rules_1.TIMEZONE).month(index);
};
exports.getSpecificMonth = getSpecificMonth;
const isSame = (time1, time2, unit) => {
    return (0, dayjs_1.default)(time1).tz(rules_1.TIMEZONE).isSame(time2, unit);
};
exports.isSame = isSame;
//# sourceMappingURL=dayjs.js.map