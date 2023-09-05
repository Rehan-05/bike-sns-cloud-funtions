"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALIDATION_IMAGEURL = exports.VALIDATION_BIKE_ID = exports.VALIDATION_NICK_NAME = exports.VALIDATION_USER_IMAGE = exports.VALIDATION_POST_IMAGE = exports.VALIDATION_POST_TEXT = exports.VALIDATION_SHAREWITH = exports.VALIDATION_BUDGET = exports.VALIDATION_NUMBEROFACCEPT = exports.VALIDATION_DESTINATION = exports.VALIDATION_EVENTDETAIL = exports.VALIDATION_IMAGE = exports.VALIDATION_BIKE = exports.VALIDATION_TAG = exports.VALIDATION_CATEGORY = exports.VALIDATION_TITLE = exports.VALIDATION_PROVINCE = exports.VALIDATION_BIRTHDAY = exports.VALIDATION_PHONE = exports.VALIDATION_GENDER = exports.VALIDATION_EMISSION_STANDARD = exports.VALIDATION_MAKER_NAME = exports.VALIDATION_BIKE_NAME = exports.VALIDATION_USER_ID = exports.VALIDATION_ACCOUNT_PASSWORD = exports.VALIDATION_ACCOUNT_EMAIL = exports.VALIDATION_ACCOUNT_TEL = exports.VALIDATION_ACCOUNT_ADDRESS = exports.VALIDATION_ACCOUNT_NAME = exports.VALIDATION_ORDER_NUMBER = exports.VALIDATION_ORDER_DATE = exports.VALIDATION_PASSWORD_UPDATE = exports.VALIDATION_PASSWORD = exports.VALIDATION_EMAIL = exports.VALIDATION_TEL = exports.VALIDATION_MONTH = exports.VALIDATION_AGENCY_ID = exports.VALIDATION_ADDRESS = exports.VALIDATION_NAME = exports.VALIDATION_TOKEM = exports.VALIDATION_ID = exports.VALIDATION_STRING = void 0;
const rules_1 = require("./rules");
const regexp_1 = require("./regexp");
const VALIDATION_STRING = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
});
exports.VALIDATION_STRING = VALIDATION_STRING;
const VALIDATION_ID = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
});
exports.VALIDATION_ID = VALIDATION_ID;
// firebase rest token and set its length according to the firebase rest token length
const VALIDATION_TOKEM = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
});
exports.VALIDATION_TOKEM = VALIDATION_TOKEM;
const VALIDATION_NAME = (where) => ({
    in: [where],
    isString: true,
    isLength: {
        options: { min: rules_1.LENGTH_NAME_MIN, max: rules_1.LENGTH_NAME_MAX },
    },
});
exports.VALIDATION_NAME = VALIDATION_NAME;
const VALIDATION_ADDRESS = (where) => ({
    in: [where],
    notEmpty: true,
    isString: true,
});
exports.VALIDATION_ADDRESS = VALIDATION_ADDRESS;
const VALIDATION_AGENCY_ID = (where) => ({
    in: [where],
    notEmpty: true,
    isString: true,
});
exports.VALIDATION_AGENCY_ID = VALIDATION_AGENCY_ID;
// add validation that query must be a month
const VALIDATION_MONTH = (where) => ({
    in: [where],
    notEmpty: true,
    isString: true,
});
exports.VALIDATION_MONTH = VALIDATION_MONTH;
const VALIDATION_TEL = (where) => ({
    in: [where],
    notEmpty: true,
    isNumeric: true,
    isMobilePhone: { options: ['ja-JP'] },
});
exports.VALIDATION_TEL = VALIDATION_TEL;
const VALIDATION_EMAIL = (where) => ({
    in: [where],
    isEmail: true,
    isLength: {
        options: { max: rules_1.LENGTH_EMAIL_MAX },
    },
});
exports.VALIDATION_EMAIL = VALIDATION_EMAIL;
const VALIDATION_PASSWORD = (where) => ({
    in: [where],
    isString: true,
    matches: {
        options: regexp_1.REGEXP_PASSWORD,
    },
    isLength: {
        options: { min: rules_1.LENGTH_PASSWORD_MIN, max: rules_1.LENGTH_PASSWORD_MAX },
    },
});
exports.VALIDATION_PASSWORD = VALIDATION_PASSWORD;
const VALIDATION_PASSWORD_UPDATE = (where) => ({
    in: [where],
    isString: true,
    matches: {
        options: regexp_1.REGEXP_PASSWORD,
    },
    optional: {
        options: { nullable: true },
    },
    isLength: {
        options: { min: rules_1.LENGTH_PASSWORD_MIN, max: rules_1.LENGTH_PASSWORD_MAX },
    },
});
exports.VALIDATION_PASSWORD_UPDATE = VALIDATION_PASSWORD_UPDATE;
// create a validation for the order date
const VALIDATION_ORDER_DATE = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
});
exports.VALIDATION_ORDER_DATE = VALIDATION_ORDER_DATE;
// create a validation for the order number
const VALIDATION_ORDER_NUMBER = (where) => ({
    in: [where],
    isNumeric: true,
    notEmpty: true,
});
exports.VALIDATION_ORDER_NUMBER = VALIDATION_ORDER_NUMBER;
// account Validation Name can be null
const VALIDATION_ACCOUNT_NAME = (where) => ({
    in: [where],
    isString: true,
    optional: {
        options: { nullable: true },
    },
    isLength: {
        options: { min: rules_1.LENGTH_NAME_MIN, max: rules_1.LENGTH_NAME_MAX },
    },
});
exports.VALIDATION_ACCOUNT_NAME = VALIDATION_ACCOUNT_NAME;
// account Validation Address can be null
const VALIDATION_ACCOUNT_ADDRESS = (where) => ({
    in: [where],
    isString: true,
    optional: {
        options: { nullable: true },
    },
});
exports.VALIDATION_ACCOUNT_ADDRESS = VALIDATION_ACCOUNT_ADDRESS;
// account Validation Tel can be null
const VALIDATION_ACCOUNT_TEL = (where) => ({
    in: [where],
    isNumeric: true,
    optional: {
        options: { nullable: true },
    },
    isMobilePhone: { options: ['ja-JP'] },
});
exports.VALIDATION_ACCOUNT_TEL = VALIDATION_ACCOUNT_TEL;
// account Validation Email can be null
const VALIDATION_ACCOUNT_EMAIL = (where) => ({
    in: [where],
    isEmail: true,
    optional: {
        options: { nullable: true },
    },
    isLength: {
        options: { max: rules_1.LENGTH_EMAIL_MAX },
    },
});
exports.VALIDATION_ACCOUNT_EMAIL = VALIDATION_ACCOUNT_EMAIL;
// account Validation Password can be null
const VALIDATION_ACCOUNT_PASSWORD = (where) => ({
    in: [where],
    isString: true,
    matches: {
        options: regexp_1.REGEXP_PASSWORD,
    },
    optional: {
        options: { nullable: true },
    },
    isLength: {
        options: { min: rules_1.LENGTH_PASSWORD_MIN, max: rules_1.LENGTH_PASSWORD_MAX },
    },
});
exports.VALIDATION_ACCOUNT_PASSWORD = VALIDATION_ACCOUNT_PASSWORD;
const VALIDATION_USER_ID = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
});
exports.VALIDATION_USER_ID = VALIDATION_USER_ID;
const VALIDATION_BIKE_NAME = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
    isLength: {
        options: { min: rules_1.LENGTH_NAME_MIN, max: rules_1.LENGTH_NAME_MAX },
    },
});
exports.VALIDATION_BIKE_NAME = VALIDATION_BIKE_NAME;
const VALIDATION_MAKER_NAME = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
    isLength: {
        options: { min: rules_1.LENGTH_NAME_MIN, max: rules_1.LENGTH_NAME_MAX },
    },
});
exports.VALIDATION_MAKER_NAME = VALIDATION_MAKER_NAME;
const VALIDATION_EMISSION_STANDARD = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
    isLength: {
        options: { min: rules_1.LENGTH_NAME_MIN, max: rules_1.LENGTH_NAME_MAX },
    },
});
exports.VALIDATION_EMISSION_STANDARD = VALIDATION_EMISSION_STANDARD;
const VALIDATION_GENDER = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
});
exports.VALIDATION_GENDER = VALIDATION_GENDER;
const VALIDATION_PHONE = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
});
exports.VALIDATION_PHONE = VALIDATION_PHONE;
const VALIDATION_BIRTHDAY = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
});
exports.VALIDATION_BIRTHDAY = VALIDATION_BIRTHDAY;
const VALIDATION_PROVINCE = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
});
exports.VALIDATION_PROVINCE = VALIDATION_PROVINCE;
const VALIDATION_TITLE = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
});
exports.VALIDATION_TITLE = VALIDATION_TITLE;
const VALIDATION_CATEGORY = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
});
exports.VALIDATION_CATEGORY = VALIDATION_CATEGORY;
// tag is a array to validate
const VALIDATION_TAG = (where) => ({
    in: [where],
    isArray: true,
    notEmpty: true,
});
exports.VALIDATION_TAG = VALIDATION_TAG;
const VALIDATION_BIKE = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
});
exports.VALIDATION_BIKE = VALIDATION_BIKE;
const VALIDATION_IMAGE = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
});
exports.VALIDATION_IMAGE = VALIDATION_IMAGE;
const VALIDATION_EVENTDETAIL = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
});
exports.VALIDATION_EVENTDETAIL = VALIDATION_EVENTDETAIL;
const VALIDATION_DESTINATION = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
});
exports.VALIDATION_DESTINATION = VALIDATION_DESTINATION;
const VALIDATION_NUMBEROFACCEPT = (where) => ({
    in: [where],
    isNumeric: true,
    notEmpty: true,
});
exports.VALIDATION_NUMBEROFACCEPT = VALIDATION_NUMBEROFACCEPT;
const VALIDATION_BUDGET = (where) => ({
    in: [where],
    isNumeric: true,
    notEmpty: true,
});
exports.VALIDATION_BUDGET = VALIDATION_BUDGET;
const VALIDATION_SHAREWITH = (where) => ({
    in: [where],
    isArray: true,
    notEmpty: true,
});
exports.VALIDATION_SHAREWITH = VALIDATION_SHAREWITH;
const VALIDATION_POST_TEXT = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
});
exports.VALIDATION_POST_TEXT = VALIDATION_POST_TEXT;
const VALIDATION_POST_IMAGE = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
});
exports.VALIDATION_POST_IMAGE = VALIDATION_POST_IMAGE;
const VALIDATION_USER_IMAGE = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
});
exports.VALIDATION_USER_IMAGE = VALIDATION_USER_IMAGE;
const VALIDATION_NICK_NAME = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
});
exports.VALIDATION_NICK_NAME = VALIDATION_NICK_NAME;
//bike id schema
const VALIDATION_BIKE_ID = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
});
exports.VALIDATION_BIKE_ID = VALIDATION_BIKE_ID;
const VALIDATION_IMAGEURL = (where) => ({
    in: [where],
    isString: true,
    notEmpty: true,
});
exports.VALIDATION_IMAGEURL = VALIDATION_IMAGEURL;
//# sourceMappingURL=validation.js.map