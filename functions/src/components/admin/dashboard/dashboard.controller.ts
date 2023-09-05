import { Request, Response, NextFunction } from 'express';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { logger } from 'firebase-functions/v1';
import { adminauth, auth, db } from '../../../firebase/config';
import { encodeJwt } from '../../../utils/jwt';

import * as service from './dashboard.service';
import { ERROR } from '../../../utils/ApiErrorStructure';
import { authMessages } from './dashboard.message';

export const listUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await db.collection('Users').get();
    const usersList: any = [];
    users.forEach((doc: any) => {
      usersList.push(doc.data());
    });
    res.status(200).json(usersList);
  } catch (err: any) {
    logger.error(err);
    return res.status(500).json(ERROR(authMessages.internalServerError, 500, 1007));
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await db.collection('Users').doc(req.params.id).get();
    if (!user.exists) {
      return res.status(404).json(ERROR(authMessages.notFound, 404, 1008));
    }
    res.status(200).json(user.data());
  } catch (err: any) {
    logger.error(err);
    return res.status(500).json(ERROR(authMessages.internalServerError, 500, 1007));
  }
};

export const listBikes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const bikes = await db.collection('Bikes').get();
    const bikesList: any = [];
    bikes.forEach((doc: any) => {
      bikesList.push(doc.data());
    });
    res.status(200).json(bikesList);
  } catch (err: any) {
    logger.error(err);
    return res.status(500).json(ERROR(authMessages.internalServerError, 500, 1007));
  }
};

export const addBike = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bikeName, makerName, emission } = req.body;
    if (bikeName && makerName && emission) {
      const bike = await db.collection('Bikes').add({ bikeName, makerName, emission });
      res.status(200).json(bike);
    } else {
      res.status(400).json({ message: 'Bad Request' });
    }
  } catch (err: any) {
    logger.error(err);
    return res.status(500).json(ERROR(authMessages.internalServerError, 500, 1007));
  }
};

// Get List of categories (category name, created at, Number of basic post, number of maintaince post) from database
export const listCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await db.collection('Categories').get();
    const categoriesList: any = [];
    categories.forEach((doc: any) => {
      categoriesList.push(doc.data());
    });
    res.status(200).json(categoriesList);
  } catch (err: any) {
    logger.error(err);
    return res.status(500).json(ERROR(authMessages.internalServerError, 500, 1007));
  }
};
