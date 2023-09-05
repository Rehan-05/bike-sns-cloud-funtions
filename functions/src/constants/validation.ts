import { ParamSchema, Location } from 'express-validator';

import {
  LENGTH_EMAIL_MAX,
  LENGTH_ID,
  LENGTH_NAME_MAX,
  LENGTH_NAME_MIN,
  LENGTH_PASSWORD_MAX,
  LENGTH_PASSWORD_MIN,
} from './rules';

import { REGEXP_PASSWORD } from './regexp';

export const VALIDATION_STRING = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
});

export const VALIDATION_ID = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
});
// firebase rest token and set its length according to the firebase rest token length
export const VALIDATION_TOKEM = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
});

export const VALIDATION_NAME = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  isLength: {
    options: { min: LENGTH_NAME_MIN, max: LENGTH_NAME_MAX },
  },
});

export const VALIDATION_ADDRESS = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isString: true,
});
export const VALIDATION_AGENCY_ID = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isString: true,
});

// add validation that query must be a month
export const VALIDATION_MONTH = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isString: true,
});

export const VALIDATION_TEL = (where: Location): ParamSchema => ({
  in: [where],
  notEmpty: true,
  isNumeric: true,
  isMobilePhone: { options: ['ja-JP'] },
});

export const VALIDATION_EMAIL = (where: Location): ParamSchema => ({
  in: [where],
  isEmail: true,
  isLength: {
    options: { max: LENGTH_EMAIL_MAX },
  },
});

export const VALIDATION_PASSWORD = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  matches: {
    options: REGEXP_PASSWORD,
  },
  isLength: {
    options: { min: LENGTH_PASSWORD_MIN, max: LENGTH_PASSWORD_MAX },
  },
});

export const VALIDATION_PASSWORD_UPDATE = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  matches: {
    options: REGEXP_PASSWORD,
  },
  optional: {
    options: { nullable: true },
  },
  isLength: {
    options: { min: LENGTH_PASSWORD_MIN, max: LENGTH_PASSWORD_MAX },
  },
});

// create a validation for the order date
export const VALIDATION_ORDER_DATE = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
});

// create a validation for the order number
export const VALIDATION_ORDER_NUMBER = (where: Location): ParamSchema => ({
  in: [where],
  isNumeric: true,
  notEmpty: true,
});

// account Validation Name can be null
export const VALIDATION_ACCOUNT_NAME = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  optional: {
    options: { nullable: true },
  },
  isLength: {
    options: { min: LENGTH_NAME_MIN, max: LENGTH_NAME_MAX },
  },
});

// account Validation Address can be null
export const VALIDATION_ACCOUNT_ADDRESS = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  optional: {
    options: { nullable: true },
  },
});

// account Validation Tel can be null
export const VALIDATION_ACCOUNT_TEL = (where: Location): ParamSchema => ({
  in: [where],
  isNumeric: true,
  optional: {
    options: { nullable: true },
  },
  isMobilePhone: { options: ['ja-JP'] },
});

// account Validation Email can be null
export const VALIDATION_ACCOUNT_EMAIL = (where: Location): ParamSchema => ({
  in: [where],
  isEmail: true,
  optional: {
    options: { nullable: true },
  },
  isLength: {
    options: { max: LENGTH_EMAIL_MAX },
  },
});

// account Validation Password can be null
export const VALIDATION_ACCOUNT_PASSWORD = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  matches: {
    options: REGEXP_PASSWORD,
  },
  optional: {
    options: { nullable: true },
  },
  isLength: {
    options: { min: LENGTH_PASSWORD_MIN, max: LENGTH_PASSWORD_MAX },
  },
});

export const VALIDATION_USER_ID = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
});

export const VALIDATION_BIKE_NAME = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
  isLength: {
    options: { min: LENGTH_NAME_MIN, max: LENGTH_NAME_MAX },
  },
});

export const VALIDATION_MAKER_NAME = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
  isLength: {
    options: { min: LENGTH_NAME_MIN, max: LENGTH_NAME_MAX },
  },
});

export const VALIDATION_EMISSION_STANDARD = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
  isLength: {
    options: { min: LENGTH_NAME_MIN, max: LENGTH_NAME_MAX },
  },
});

export const VALIDATION_GENDER = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
});

export const VALIDATION_PHONE = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
});

export const VALIDATION_BIRTHDAY = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
});

export const VALIDATION_PROVINCE = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
});


export const VALIDATION_TITLE = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
});

export const VALIDATION_CATEGORY = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
});

// tag is a array to validate
export const VALIDATION_TAG = (where: Location): ParamSchema => ({
  in: [where],
  isArray: true,
  notEmpty: true,
});


export const VALIDATION_BIKE = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
});

export const VALIDATION_IMAGE = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
});

export const VALIDATION_EVENTDETAIL = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
});

export const VALIDATION_DESTINATION = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
});

export const VALIDATION_NUMBEROFACCEPT = (where: Location): ParamSchema => ({
  in: [where],
  isNumeric: true,
  notEmpty: true,
});

export const VALIDATION_BUDGET = (where: Location): ParamSchema => ({
  in: [where],
  isNumeric: true,
  notEmpty: true,
});

export const VALIDATION_SHAREWITH = (where: Location): ParamSchema => ({
  in: [where],
  isArray: true,
  notEmpty: true,
});

export const VALIDATION_POST_TEXT = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
});
 
export const VALIDATION_POST_IMAGE = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
});

export const VALIDATION_USER_IMAGE = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
});

export const VALIDATION_NICK_NAME = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
});

  //bike id schema
export const VALIDATION_BIKE_ID = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
});

export const VALIDATION_IMAGEURL = (where: Location): ParamSchema => ({
  in: [where],
  isString: true,
  notEmpty: true,
});

  