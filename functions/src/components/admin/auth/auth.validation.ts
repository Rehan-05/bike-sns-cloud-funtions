import { Schema } from 'express-validator';
import { VALIDATION_EMAIL, VALIDATION_ID, VALIDATION_PASSWORD, VALIDATION_TOKEM } from '../../../constants/validation';

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
