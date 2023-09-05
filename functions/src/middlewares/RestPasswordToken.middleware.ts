import { NextFunction, Response, Request } from 'express';
import { verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '../firebase/config';
import { ERROR } from '../utils/ApiErrorStructure';

// create a middleware to verify the reset password token
export const verifyResetPasswordToken = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.body;

  try {
    let email = await verifyPasswordResetCode(auth, token);
    if (email) {
      next();
    } else {
      return res.status(401).json(ERROR('Invalid token', 401, 1000));
    }
  } catch (err: any) {
    if (err?.code === 'auth/invalid-action-code') {
      return res.status(401).json(ERROR('Invalid token', 401, 1000));
    } else if (err?.code === 'auth/expired-action-code') {
      return res.status(401).json(ERROR('Expired token', 401, 1011));
    } else {
      return res.status(500).json(ERROR('Internal server error', 500, 1007));
    }
  }
};
