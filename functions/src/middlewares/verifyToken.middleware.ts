import { decodeJwt } from '../utils/jwt';

import { Request, Response, NextFunction } from 'express';
import { ERROR } from '../utils/ApiErrorStructure';
import { authMessages } from '../components/admin/auth/auth.message';
import { db } from '../firebase/config';
import dayjs = require('dayjs');
import { logger } from 'firebase-functions/v1';

// create a new middleware function to verify a token
export const authAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const bearer: any = req.headers['authorization'];
  // bearer token

  console.log(bearer);
  if (!bearer) {
    logger.error('No token provided');
    return res.status(403).json(ERROR('access Token is not valid', 403, 1008));
  }
  try {
    const token = bearer.split(' ')[1];
    const decoded = await decodeJwt(token as string);
    // check is token expired

    req.user = decoded.payload;
    // check if the user is admin

    console.log(decoded.payload.id);
    const isAdmin = await db.collection('Admin').doc(decoded?.payload.id).get();
    if (!isAdmin.exists || isAdmin.data().status !== 'active') {
      return res.status(401).json(ERROR(authMessages.notAdmin, 401, 1003));
    }

    next();
  } catch (err: any) {
    // handle jwt error
    logger.error('error', err);
    // if there is firebase error then hanlde that
    //  Error: Value for argument \"documentPath\" is not a valid resource path
    //  . Path must be a non-empty string.
    // handle firebase error
    if (err.code === 400) {
      return res.status(400).json(ERROR(err.message, 400, 1004));
    }

    return res.status(401).json(ERROR(err, 401, 1009));
  }
};
export const authUser = async (req: Request, res: Response, next: NextFunction) => {
  const bearer: any = req.headers['authorization'];
  // bearer token
  console.log('middleware bearer token', bearer);
  if (!bearer) {
    logger.error('No token provided');
    return res.status(403).json(ERROR('access Token is not valid', 403, 1008));
  }
  try {
    const token = bearer.split(' ')[1];
    const decoded = await decodeJwt(token as string);
    // check is token expired

    req.user = decoded.payload;

    const isUser = await db.collection('User').doc(decoded?.payload.id).get();
    if (!isUser.exists) {
      return res.status(401).json(ERROR(authMessages.notAdmin, 401, 1003));
    }
    next();
  } catch (err: any) {
    logger.error('error', err);
    if (err.code === 400) {
      return res.status(400).json(ERROR(err.message, 400, 1004));
    }
    return res.status(401).json(ERROR(err, 401, 1009));
  }
};
