import * as express from 'express';
import { checkSchema } from 'express-validator';

import {
  FORGOT_PASSWORD_SCHEMA,
  LOGIN_SCHEMA,
  UPDATE_PASSWORD_SCHEMA,
  VERIFYEMAIL_SCHEMA,
  REGISTERATION_SCHEMA,
} from './auth.validation';

import * as controller from './auth.controller';
import { checkValidation } from '../../../utils/validation';
import { isUser } from '../../../utils/auth';
import { authUser } from '../../../middlewares/verifyToken.middleware';
import { verifyResetPasswordToken } from '../../../middlewares/RestPasswordToken.middleware';

const router = express.Router();

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: App is required for the user to login.
   *     tags:
   *       - Auth
   *     requestBody:
   *       content: 
   *         application/json:
   *          schema:
   *           type: object
   *           required:
   *             - email
   *             - password
   *           properties:
   *             email:
   *               type: string
   *             password:
   *               type: string
   *     responses:
   *       200:
   *        description: App user login.
   *
   */
  router.put('/login', checkSchema(LOGIN_SCHEMA), checkValidation, controller.login);
  
  router.put('/logout', isUser, controller.logout);
  router.put('/password/forgot', checkSchema(FORGOT_PASSWORD_SCHEMA), checkValidation, controller.forgotPassword);
  router.put(
    '/password/reset',
    checkSchema(UPDATE_PASSWORD_SCHEMA),
    checkValidation,
    verifyResetPasswordToken,
    controller.updatePassword,
  );
  router.post('/register/email/confirm', checkSchema(VERIFYEMAIL_SCHEMA), checkValidation, controller.verifyEmailAddress);
  router.post('/register', controller.registrationUser);

export default router;
