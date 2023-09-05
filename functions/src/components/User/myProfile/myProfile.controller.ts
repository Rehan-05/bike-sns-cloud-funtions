import { Request, Response, NextFunction } from 'express';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { logger } from 'firebase-functions/v1';
import { adminauth, auth, db } from '../../../firebase/config';
import { decodeJwt, encodeJwt } from '../../../utils/jwt';

import * as service from './myProfile.service';
import { ERROR } from '../../../utils/ApiErrorStructure';
import { profileMessages } from './myProfile.message';
import dayjs = require('dayjs');
import { async } from '@firebase/util';

export const getProfileData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('Get profile data request received');
    const { uid } = req.params;
    const user = await db.collection('User').doc(uid).get();
    if (!user.exists) {
      return res.status(404).json(ERROR(profileMessages.notFound, 404, 1000));
    }
    const data = user.data();
    const { email, nickName, phone, gender, birthDay, province } = data;
    res.status(200).json({ email, nickName, phone, gender, birthDay, province });
  } catch (err: any) {
    logger.error(err);
    return res.status(500).json(ERROR(profileMessages.internalServerError, 500, 1001));
  }
};

export const dailyPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('Daily post request received');
    const { id } = req.user;
    const { title, category, tag, bike, image } = req.body;
    const newdata = await service.dailyPost(id, title, category, tag, bike, image);
    if (newdata === 'success') {
      logger.info(`Daily post created successfully`);
      res.status(200).json({
        message: 'Daily post created successfully',
      });
    } else {
      logger.info(`Daily post not created successfully`);
      res.status(500).json({
        message: 'Something went wrong',
      });
    }
  } catch (err: any) {
    logger.error(err);
  }
};

export const editDailyPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('Edit post request received');
    const { id } = req.user;
    const { postId } = req.params;
    const { title, category, tag, bike, image } = req.body;
    const editdata = await service.editDailyPost(id, postId, title, category, tag, bike, image);
    if (editdata === 'success') {
      logger.info(`Daily post edit successfully`);
      res.status(200).json({
        message: 'Daily post edit successfully',
      });
    } else {
      logger.info(`Daily post not edit successfully`);
      res.status(500).json({
        message: 'Something went wrong',
      });
    }
  } catch (err: any) {
    logger.error(err);
    return res.status(500).json(ERROR(profileMessages.internalServerError, 500, 1001));
  }
};

export const addTouringEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('Add touring event request received');
    const { id } = req.user;
    const { title, eventDetail,destination,NumberOfAccept,budget,shareWith } = req.body;
    const touringData = await service.addTouringEvent(id,title, eventDetail,destination,NumberOfAccept,budget,shareWith);
    if (touringData === 'success') {
      logger.info(`touring event added successfully`);
      res.status(200).json({
        message: 'touring event added successfully',
        result: touringData,
      });
    } else {
      logger.info(`touring event not added`);
      res.status(500).json({
        message: 'Something went wrong',
      });
    }
  } catch (err: any) {
    logger.error(err);
    return res.status(500).json(ERROR(profileMessages.internalServerError, 500, 1001));
  }
};

export const touringList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('All created touring event');
    const { id } = req.user;
    const touringList = await service.touringList(id);
    if (touringList) {
      logger.info(`touring event list`);
      res.status(200).json({
        message: 'touring event list',
        result: touringList,
      });
    }
  } catch (err: any) {
    logger.error(err);
    return res.status(500).json(ERROR(profileMessages.internalServerError, 500, 1001));
  }
};

export const touringUserList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('All Joined touring events');
    const { id } = req.user;
    const touringList = await service.touringUserList(id);
    if (touringList) {
      logger.info(`touring joined list`);
      res.status(200).json({
        message: 'touring joined list',
        result: touringList,
      });
    }
  } catch (err: any) {
    logger.error(err);
    return res.status(500).json(ERROR(profileMessages.internalServerError, 500, 1001));
  }
};
