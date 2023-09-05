import { Request, Response, NextFunction } from 'express';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { logger } from 'firebase-functions/v1';
import { adminauth, auth, db } from '../../../firebase/config';
import { decodeJwt, encodeJwt } from '../../../utils/jwt';

import * as service from './touring.service';
import { ERROR } from '../../../utils/ApiErrorStructure';
import { touringMessages } from './touring.message';
import dayjs = require('dayjs');
import { async } from '@firebase/util';


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
    return res.status(500).json(ERROR(touringMessages.internalServerError, 500, 1001));
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
    return res.status(500).json(ERROR(touringMessages.internalServerError, 500, 1001));
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
    return res.status(500).json(ERROR(touringMessages.internalServerError, 500, 1001));
  }
};


export const joinTouring = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('Join touring event request received');
    const { id } = req.user;
    const { touringId } = req.params;
    const joinTouring = await service.joinTouring(id, touringId);
    if (joinTouring === 'success') {
      logger.info(`touring event joined successfully`);
      res.status(200).json({
        message: 'touring event joined successfully',
      });
    } else {
      logger.info(`touring event not joined`);
      res.status(500).json({
        message: 'Something went wrong',
      });
    }
  } catch (err: any) {
    logger.error(err);
    return res.status(500).json(ERROR(touringMessages.internalServerError, 500, 1001));
  }
};


export const leaveTouring = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('Leave touring event request received');
    const { id } = req.user;
    const { touringId } = req.params;
    const leaveTouring = await service.leaveTouring(id, touringId);
    if (leaveTouring === 'success') {
      logger.info(`touring event left successfully`);
      res.status(200).json({
        message: 'touring event left successfully',
      });
    } else {
      logger.info(`touring event not left`);
      res.status(500).json({
        message: 'Something went wrong',
      });
    }
  } catch (err: any) {
    logger.error(err);
    return res.status(500).json(ERROR(touringMessages.internalServerError, 500, 1001));
  }
};
