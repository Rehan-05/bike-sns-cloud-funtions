import * as express from 'express';
import { checkSchema } from 'express-validator';

// import {  } from './myGarage.validation';

import * as controller from './myGarage.controller';
import { checkValidation } from '../../../utils/validation';
import { authUser } from '../../../middlewares/verifyToken.middleware';
// import { isUser } from '../../../utils/auth';
const router = express.Router();

router.get('/users/:userId', authUser, controller.userProfile);
router.put('/users/:userId', authUser, controller.updateUserProfile);
router.get('/users/:userId/touring', authUser, controller.listOfTouring);
router.get('/users/:userId/posts', authUser, controller.listOfPosts);
// router.get('/users/:userId/maintenances', authUser, controller.listOfMaintenances);

export default router;
