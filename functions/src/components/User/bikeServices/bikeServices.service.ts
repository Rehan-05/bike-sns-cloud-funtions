import dayjs = require('dayjs');
import { logger } from 'firebase-functions/v1';
import { adminauth, auth, db } from '../../../firebase/config';
import {
  badImplementationException,
  HttpException,
  pageNoFoundException,
  emailConflictException,
  dataConflictException,
  unauthorizedException,
  payjpInvalidCardException,
  validationException,
} from '../../../utils/apiErrorHandler';

import { updatePassword, signInWithEmailAndPassword } from 'firebase/auth';
import { async } from '@firebase/util';

export const addBike = async (userId: string, bikeId: string, ImageUrl: string) => {
   let error: Error | HttpException | undefined;
  try{
    logger.info('Add bike request received');
    const user = await db.collection('User').doc(userId).get();
    if (!user.exists) {
      logger.info('User not found');
      return Promise.reject(pageNoFoundException('User not found'));
    }
    const bike = await db.collection('Bikes').doc(bikeId).get();
    if (!bike.exists) {
      logger.info('Bike not found');
      return Promise.reject(pageNoFoundException('Bike not found'));
    }
    const newdata = await db.collection('User').doc(userId).update({
      bike: bikeId,
      bikeImage: ImageUrl,
    });
    logger.info(`Bike added successfully`);
    return Promise.resolve('success');
  } catch (err) {
    error = err instanceof Error ? err : badImplementationException(err);
  }
}


export const deleteBike = async (userId: string, bikeId: string) => {
    let error: Error | HttpException | undefined;
    try{
      logger.info('Delete bike request received');
      const user = await db.collection('User').doc(userId).get();
      if (!user.exists) {
        logger.info('User not found');
        return Promise.reject(pageNoFoundException('User not found'));
      }
      const bike = await db.collection('Bikes').doc(bikeId).get();
      if (!bike.exists) {
        logger.info('Bike not found');
        return Promise.reject(pageNoFoundException('Bike not found'));
      }
      const newdata = await db.collection('User').doc(userId).update({
        bike: '',
        bikeImage: '',
      });
      logger.info(`Bike deleted successfully`);
      return Promise.resolve('success');
    } catch (err) {
      error = err instanceof Error ? err : badImplementationException(err);
    }
  }

  export const getBikes = async (userId: string) => {
    let error: Error | HttpException | undefined;
    try{
      logger.info('Get bikes request received');
      const user = await db.collection('User').doc(userId).get();
      if (!user.exists) {
        logger.info('User not found');
        return Promise.reject(pageNoFoundException('User not found'));
      }
      const bikes = await db.collection('Bikes').get();
      const bikeList: any = [];
      bikes.forEach((doc:any) => {
        bikeList.push(doc.data());
      });
      logger.info(`Bikes fetched successfully`);
      return Promise.resolve(bikeList);
    } catch (err) {
      error = err instanceof Error ? err : badImplementationException(err);
    }
  }