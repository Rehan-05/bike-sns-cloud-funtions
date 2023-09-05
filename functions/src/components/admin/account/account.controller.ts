import { Request, Response, NextFunction } from 'express';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { logger } from 'firebase-functions/v1';
import { adminauth, auth, db } from '../../../firebase/config';
import { encodeJwt } from '../../../utils/jwt';

import * as service from './account.service';
import { ERROR } from '../../../utils/ApiErrorStructure';
import { authMessages } from './account.message';
import dayjs = require('dayjs');

export const updateAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('Account update request received');
    const { password, email, newPassword } = req.body;
    if (password && email && newPassword) {
      const result = await service.UpdatePassword(email, password, newPassword);
      logger.info(`User updated with uid: ${result}`);
      const admin = await db
        .collection('Admin')
        .doc(result.uid)
        .update({ updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'), password: newPassword });
      logger.info(`User updat collection updated with uid: ${result.uid}`);
      res.status(200).json({ message: 'Update Password Successfully' });
    } else {
      res.status(400).json({ message: 'Bad Request' });
    }
  } catch (err: any) {
    logger.error(err);
    if (err?.code === 'auth/user-not-found') {
      return res.status(401).json(ERROR(authMessages['auth/user-not-found'], 401, 1000));
    } else if (err?.code === 'auth/wrong-password') {
      return res.status(401).json(ERROR(authMessages['auth/wrong-password'], 401, 1001));
    } else if (err?.code === 'auth/invalid-email') {
      return res.status(401).json(ERROR(authMessages['auth/invalid-email'], 401, 1002));
    } else if (err?.code === 'auth/user-disabled') {
      return res.status(401).json(ERROR(authMessages['auth/user-disabled'], 401, 1003));
    } else if (err?.code === 'auth/argument-error') {
      return res.status(401).json(ERROR(authMessages['auth/argument-error'], 401, 1004));
    } else if (err?.code === 'auth/invalid-credential') {
      return res.status(401).json(ERROR(authMessages['auth/invalid-credential'], 401, 1005));
    } else if (err?.code === 'auth/operation-not-allowed') {
      return res.status(401).json(ERROR(authMessages['auth/operation-not-allowed'], 401, 1006));
    } else {
      return res.status(500).json(ERROR(authMessages.internalServerError, 500, 1007));
    }
  }
};
