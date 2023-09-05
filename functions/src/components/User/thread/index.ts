import * as express from 'express';
import { checkSchema } from 'express-validator';

import { ADDTWEETTHREAD_SCHEMA } from './tread.validation';

import * as controller from './thread.controller';
import { checkValidation } from '../../../utils/validation';
import { authUser } from '../../../middlewares/verifyToken.middleware';
// import { isUser } from '../../../utils/auth';
const router = express.Router();

router.post('/addTweetThread',checkSchema(ADDTWEETTHREAD_SCHEMA),checkValidation, authUser, controller.addTweetThread);

export default router;
