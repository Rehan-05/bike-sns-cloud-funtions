import * as express from 'express';
import { checkSchema } from 'express-validator';

// import {  } from './myGarage.validation';

import * as controller from './listOfTalk.controller';
import { checkValidation } from '../../../utils/validation';
import { authUser } from '../../../middlewares/verifyToken.middleware';
// import { isUser } from '../../../utils/auth';
const router = express.Router();

// router.get('/users/talks', authUser, checkValidation, controller.listOfTalkRoom);
export default router;
