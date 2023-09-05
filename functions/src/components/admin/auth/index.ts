import * as express from 'express';
import { checkSchema } from 'express-validator';

import { FORGOT_PASSWORD_SCHEMA, LOGIN_SCHEMA, UPDATE_PASSWORD_SCHEMA } from './auth.validation';

import * as controller from './auth.controller';
import { checkValidation } from '../../../utils/validation';
import { isAdmin } from '../../../utils/auth';
import { verifyResetPasswordToken } from '../../../middlewares/RestPasswordToken.middleware';

const router = express.Router();

router.put('/login', checkSchema(LOGIN_SCHEMA), checkValidation, controller.login);
router.put('/logout', isAdmin, controller.logout);
router.put('/password/forgot', checkSchema(FORGOT_PASSWORD_SCHEMA), checkValidation, controller.forgotPassword);
router.put(
  '/password/reset',
  checkSchema(UPDATE_PASSWORD_SCHEMA),
  checkValidation,
  verifyResetPasswordToken,
  controller.updatePassword,
);

export default router;
