import * as express from 'express';
import { checkSchema } from 'express-validator';

import { ADD_BIKE_SCHEMA } from './bikeServices.validation';

import * as controller from './bikeServices.controller';
import { checkValidation } from '../../../utils/validation';
import { authUser } from '../../../middlewares/verifyToken.middleware';
// import { isUser } from '../../../utils/auth';
const router = express.Router();


router.post('/users/:userId/bikes',authUser, checkSchema({ADD_BIKE_SCHEMA}), checkValidation, controller.addBike);
router.delete('/users/:userId/bikes/:bikeId',authUser,controller.deleteBike);
router.get('/users/:userId/bikes',authUser,controller.getBikes);

export default router;
