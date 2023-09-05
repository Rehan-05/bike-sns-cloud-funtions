import { Schema } from 'express-validator';
import {
  VALIDATION_USER_ID,
  VALIDATION_BIKE_NAME,
  VALIDATION_MAKER_NAME,
  VALIDATION_EMISSION_STANDARD,
} from '../../../constants/validation';

export const GETUSER_SCHEMA: Schema = {
  id: VALIDATION_USER_ID('params'),
};

export const ADD_BIKE_SCHEMA: Schema = {
  bikeName: VALIDATION_BIKE_NAME('body'),
  makerName: VALIDATION_MAKER_NAME('body'),
  emission: VALIDATION_EMISSION_STANDARD('body'),
};
