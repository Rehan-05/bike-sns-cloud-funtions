import * as express from 'express';
import { checkSchema } from 'express-validator';

import { ADDTOURING_SCHEMA } from './touring.validation';

import * as controller from './touring.controller';
import { checkValidation } from '../../../utils/validation';
import { authUser } from '../../../middlewares/verifyToken.middleware';
// import { isUser } from '../../../utils/auth';
const router = express.Router();

router.post('/addTouringEvent', checkSchema(ADDTOURING_SCHEMA), checkValidation, authUser, controller.addTouringEvent);
router.get('/touringList', authUser, controller.touringList);
router.get('/touringUserList', authUser, checkValidation, controller.touringUserList);
router.post('/touring/:touringId/join', authUser, controller.joinTouring);
router.delete('/touring/:touringId/leave', authUser, controller.leaveTouring);
export default router;
