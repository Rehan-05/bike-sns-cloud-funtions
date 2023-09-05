import { Schema } from 'express-validator';
import {
  VALIDATION_BIKE,
  VALIDATION_BIKE_NAME,
  VALIDATION_BUDGET,
  VALIDATION_CATEGORY,
  VALIDATION_EMISSION_STANDARD,
  VALIDATION_IMAGEURL,
  VALIDATION_MAKER_NAME,
} from '../../../constants/validation';


export const ADD_BIKE_SCHEMA: Schema = {
  bikeId: VALIDATION_BIKE('body'),
  ImageUrl: VALIDATION_IMAGEURL('body'),
};
