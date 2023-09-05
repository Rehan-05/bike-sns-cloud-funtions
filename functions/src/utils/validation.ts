import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { validationException } from './apiErrorHandler';

export const checkValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    let validation = validationException(errors);
    if (validation && validation.statusCode && validation.message) {
      return res.status(validation.statusCode).json({
        message: validation.message,
        error: validation.stack,
      });
    }
  } else next();
};
