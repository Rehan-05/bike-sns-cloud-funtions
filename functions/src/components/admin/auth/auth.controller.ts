import { Request, Response, NextFunction } from 'express';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { logger } from 'firebase-functions/v1';
import { adminauth, auth, db } from '../../../firebase/config';
import { encodeJwt } from '../../../utils/jwt';

import * as service from './auth.service';
import { ERROR } from '../../../utils/ApiErrorStructure';
import { authMessages } from './auth.message';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('Login request received');
    const { password, email } = req.body;

    const user = await signInWithEmailAndPassword(auth, email, password);
    // check if the user is admin

    const admin = await db.collection('Admin').doc(user.user.uid).get();
    if (!admin.exists) {
      return res.status(401).json(ERROR(authMessages.notAdmin, 401, 1003));
    }

    const token = encodeJwt({ id: user.user.uid }, '1d');
    const refreshToken = encodeJwt({ id: user.user.uid }, '365d');

    logger.info(`User logged in with uid: ${user.user.uid}`);

    res.status(200).json({
      accessToken: token,
      refreshToken: refreshToken,
      email: user.user.email,
      uid: user.user.uid,
      type: 'admin',
    });
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

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.info(req.user);

    res.status(200).json();
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info(req.body);

    const { email } = req.body;
    // check if the user exist
    const user = await db.collection('Admin').where('email', '==', email).get();
    if (user.empty) {
      return res.status(401).json(ERROR('User not found', 401, 1000));
    }

    let isSuccess = await service.forgotPassword(email);
    logger.info(`Password reset link sent to ${email}`);
    if (isSuccess == 'success') {
      res.status(200).json({
        message: 'Password reset link sent to your email',
      });
    }
  } catch (err: any) {
    logger.error(err);
    // handle error here
    if (err?.code === 'auth/user-not-found') {
      return res.status(401).json(ERROR('User not found', 401, 1000));
    } else if (err?.code === 'auth/invalid-email') {
      return res.status(401).json(ERROR('Invalid email', 401, 1002));
    } else {
      return res.status(500).json(ERROR('Internal server error', 500, 1007));
    }
  }
};

export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('updatePassword');

    const { password, token } = req.body;

    let response = await service.updatePassword(password, token);

    if (response === 'success') {
      logger.info(`Password updated`);
      res.status(200).json({
        message: 'Password updated successfully',
      });
    } else {
      logger.info(`Password not updated`);
      res.status(500).json({
        message: 'Something went wrong',
        response,
      });
    }
  } catch (err: any) {
    logger.error(err);
    if (err?.code === 'auth/argument-error') {
      return res.status(401).json(ERROR('Argument error', 401, 1004));
    } else if (err?.code === 'auth/expired-action-code') {
      return res.status(401).json(ERROR('Expired action code', 401, 1008));
    } else if (err?.code === 'auth/invalid-action-code') {
      return res.status(401).json(ERROR('Invalid action code', 401, 1009));
    } else if (err?.code === 'auth/user-disabled') {
      return res.status(401).json(ERROR('User disabled', 401, 1003));
    } else if (err?.code === 'auth/user-not-found') {
      return res.status(401).json(ERROR('User not found', 401, 1000));
    } else if (err?.code === 'auth/weak-password') {
      return res.status(401).json(ERROR('Weak password', 401, 1010));
    } else {
      return res.status(500).json(ERROR('Internal server error', 500, 1007));
    }
  }
};
