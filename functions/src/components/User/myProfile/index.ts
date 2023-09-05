import * as express from 'express';
import { checkSchema } from 'express-validator';

import { PROFILEDATA_SCHEMA, EDITPOST_SCHEMA, ADDPOST_SCHEMA, ADDTOURING_SCHEMA } from './myProfile.validation';

import * as controller from './myProfile.controller';
import { checkValidation } from '../../../utils/validation';
import { authUser } from '../../../middlewares/verifyToken.middleware';
// import { isUser } from '../../../utils/auth';
const router = express.Router();

router.get('/profileData/:uid', checkSchema(PROFILEDATA_SCHEMA), checkValidation, authUser, controller.getProfileData);
router.put(
  '/update/editPost/:postId',
  checkSchema(EDITPOST_SCHEMA),
  checkValidation,
  authUser,
  controller.editDailyPost,
);
router.post('/addPost', checkSchema(ADDPOST_SCHEMA), checkValidation, authUser, controller.dailyPost);
router.post('/addTouringEvent', checkSchema(ADDTOURING_SCHEMA), checkValidation, authUser, controller.addTouringEvent);
router.get('/touringList', authUser, controller.touringList);
router.get('/touringUserList', authUser, checkValidation, controller.touringUserList);

export default router;
