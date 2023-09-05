import { Request, Response, NextFunction } from 'express';
import { unauthorizedException } from './apiErrorHandler';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  next(unauthorizedException(new Error('unauthorizedException')));
};

export const isUser = (req: Request, res: Response, next: NextFunction) => {
  next(unauthorizedException(new Error('unauthorizedException')));
};
