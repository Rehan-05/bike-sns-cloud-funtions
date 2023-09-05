import { Schema } from 'express-validator';
import {
  VALIDATION_BIKE,
  VALIDATION_BUDGET,
  VALIDATION_CATEGORY,
  VALIDATION_DESTINATION,
  VALIDATION_EVENTDETAIL,
  VALIDATION_ID,
  VALIDATION_IMAGE,
  VALIDATION_NUMBEROFACCEPT,
  VALIDATION_SHAREWITH,
  VALIDATION_TAG,
  VALIDATION_TITLE,
} from '../../../constants/validation';

// user id validation
export const PROFILEDATA_SCHEMA: Schema = {
  uid: VALIDATION_ID('params'),
};

export const EDITPOST_SCHEMA: Schema = {
  postId: VALIDATION_ID('params'),
};

export const ADDPOST_SCHEMA: Schema = {
  title: VALIDATION_TITLE('body'),
  category: VALIDATION_CATEGORY('body'),
  tag: VALIDATION_TAG('body'),
  bike: VALIDATION_BIKE('body'),
  image: VALIDATION_IMAGE('body'),
};

export const ADDTOURING_SCHEMA: Schema = {
  title: VALIDATION_TITLE('body'),
  eventDetail: VALIDATION_EVENTDETAIL('body'),
  destination: VALIDATION_DESTINATION('body'),
  NumberOfAccept: VALIDATION_NUMBEROFACCEPT('body'),
  budget: VALIDATION_BUDGET('body'),
  shareWith: VALIDATION_SHAREWITH('body'),
};
