import { Request, Response, NextFunction } from 'express';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { logger } from 'firebase-functions/v1';
import { adminauth, auth, db } from '../../../firebase/config';
import { decodeJwt, encodeJwt } from '../../../utils/jwt';

import * as service from './bikeServices.service';
import { ERROR } from '../../../utils/ApiErrorStructure';
import { bikeServiceMessages } from './bikeServices.message';
import dayjs = require('dayjs');
import { async } from '@firebase/util';


export const addBike = async (req: Request, res: Response, next: NextFunction) => {
 try{
    logger.info('Add bike request received');
    const { userId } = req.user;
    const { bikeId, ImageUrl } = req.body;
    const newdata = await service.addBike(userId, bikeId, ImageUrl);
    if (newdata === 'success') {
        logger.info(`Bike added successfully`);
        res.status(200).json({
            message: 'Bike added successfully',
        });
    } else {
        logger.info(`Bike not added successfully`);
        res.status(500).json({
            message: 'Something went wrong',
        });
    }
    } catch (err: any) {
        logger.error(err);
    }
};


export const deleteBike = async (req: Request, res: Response, next: NextFunction) => {
    try{
        logger.info('Delete bike request received');
        const { userId } = req.user;
        const { bikeId } = req.params;
        const newdata = await service.deleteBike(userId, bikeId);
        if (newdata === 'success') {
            logger.info(`Bike deleted successfully`);
            res.status(200).json({
                message: 'Bike deleted successfully',
            });
        } else {
            logger.info(`Bike not deleted successfully`);
            res.status(500).json({
                message: 'Something went wrong',
            });
        }
        } catch (err: any) {
            logger.error(err);
        }
};

export const getBikes = async (req: Request, res: Response, next: NextFunction) => {
    try{
        logger.info('Get bikes request received');
        const { userId } = req.user;
        const newdata = await service.getBikes(userId);
        if (newdata === 'success') {
            logger.info(`Bikes fetched successfully`);
            res.status(200).json({
                message: 'Bikes fetched successfully',
            });
        } else {
            logger.info(`Bikes not fetched successfully`);
            res.status(500).json({
                message: 'Something went wrong',
            });
        }
        } catch (err: any) {
            logger.error(err);
        }
};

