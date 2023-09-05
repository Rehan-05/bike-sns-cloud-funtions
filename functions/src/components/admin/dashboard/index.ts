import * as express from 'express';
import { checkSchema } from 'express-validator';

import { GETUSER_SCHEMA, ADD_BIKE_SCHEMA } from './dashboard.validation';

import * as controller from './dashboard.controller';
import { checkValidation } from '../../../utils/validation';
import { isAdmin } from '../../../utils/auth';
import { authAdmin } from '../../../middlewares/verifyToken.middleware';

const router = express.Router();

router.get('/listOfUser', authAdmin, controller.listUsers);
router.get('/user/:id', authAdmin, checkSchema(GETUSER_SCHEMA), checkValidation, controller.getUser);
router.get('/listOfBikes', authAdmin, controller.listBikes);
router.post('/addBike', authAdmin, checkSchema(ADD_BIKE_SCHEMA), checkValidation, controller.addBike);
router.get('/listCategories', authAdmin, controller.listCategories);
export default router;
