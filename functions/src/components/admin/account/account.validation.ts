import { Schema } from 'express-validator';
import { VALIDATION_ACCOUNT_EMAIL, VALIDATION_ACCOUNT_PASSWORD } from '../../../constants/validation';

export const ACCOUNT_SCHEMA: Schema = {
  email: VALIDATION_ACCOUNT_EMAIL('body'),
  password: VALIDATION_ACCOUNT_PASSWORD('body'),
  newPassword: VALIDATION_ACCOUNT_PASSWORD('body'),
};
