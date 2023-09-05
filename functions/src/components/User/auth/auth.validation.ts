import { Schema } from 'express-validator';
import {
  VALIDATION_ACCOUNT_NAME,
  VALIDATION_EMAIL,
  VALIDATION_ID,
  VALIDATION_PASSWORD,
  VALIDATION_TOKEM,
  VALIDATION_GENDER,
  VALIDATION_PHONE,
  VALIDATION_BIRTHDAY,
  VALIDATION_PROVINCE,
} from '../../../constants/validation';

export const LOGIN_SCHEMA: Schema = {
  email: VALIDATION_EMAIL('body'),
  password: VALIDATION_PASSWORD('body'),
};

export const FORGOT_PASSWORD_SCHEMA: Schema = {
  email: VALIDATION_EMAIL('body'),
};

export const UPDATE_PASSWORD_SCHEMA: Schema = {
  password: VALIDATION_PASSWORD('body'),
  token: VALIDATION_TOKEM('body'),
};

export const VERIFYEMAIL_SCHEMA: Schema = {
  email: VALIDATION_EMAIL('body'),
};

export const REGISTERATION_SCHEMA: Schema = {
  email: VALIDATION_EMAIL('body'),
  nickName: VALIDATION_ACCOUNT_NAME('body'),
  gender: VALIDATION_GENDER('body'),
  phone: VALIDATION_PHONE('body'),
  birthDay: VALIDATION_BIRTHDAY('body'),
  province: VALIDATION_PROVINCE('body'),
  password: VALIDATION_PASSWORD('body'),
};
