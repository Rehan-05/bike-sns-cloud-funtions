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


export const addTouringEvent = async (id:string,title:string, eventDetail:string,destination:string,NumberOfAccept:number,budget:number,shareWith:string) => {
  let error: Error | HttpException | undefined;
  try {
      const touring = await db.collection('TouringEvent').add({
      uid: id,
      title: title,
      eventDetail: eventDetail,
      destination: destination,
      NumberOfAccept: NumberOfAccept,
      budget: budget,
      shareWith: shareWith,
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });
  } catch (err) {
    error = err instanceof Error ? err : badImplementationException(err);
  }
  if (error) {
    logger.error(error);
    return Promise.reject(error);
  } else {
    logger.info('touringEvent executed in serivces');
    return Promise.resolve('success');
  }
};


export const touringList = async (id:string) => {
  let error: Error | HttpException | undefined;
  try {
    const touring = await db.collection('TouringEvent').where('uid', '==', id).get();
    const touringList = touring.docs.map((doc:any) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return Promise.resolve(touringList);
  } catch (err) {
    error = err instanceof Error ? err : badImplementationException(err);
  }
  if (error) {
    logger.error(error);
    return Promise.reject(error);
  } else {
    logger.info('touringList executed in serivces');
    return Promise.resolve('success');
  }
}


export const touringUserList = async (id:string) => {
  let error: Error | HttpException | undefined;
  try {
    const touring = await db.collection('TouringEvent').where('shareWith', '==', id).get();
    const touringList = touring.docs.map((doc:any) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    return Promise.resolve(touringList);
  } catch (err) {
    error = err instanceof Error ? err : badImplementationException(err);
  }
  if (error) {
    logger.error(error);
    return Promise.reject(error);
  } else {
    logger.info('touringUserList executed in serivces');
    return Promise.resolve('success');
  }
}

export const joinTouring = async (id:string, eventId:string) => {
  let error: Error | HttpException | undefined;
  try {
    const touring = await db.collection('TouringEvent').doc(eventId).update({
      NumberOfAccept: db.FieldValue.increment(1),
    });
  } catch (err) {
    error = err instanceof Error ? err : badImplementationException(err);
  }
  if (error) {
    logger.error(error);
    return Promise.reject(error);
  } else {
    logger.info('joinTouring executed in serivces');
    return Promise.resolve('success');
  }
}


export const leaveTouring = async (id:string, eventId:string) => {
  let error: Error | HttpException | undefined;
  try {
    const touring = await db.collection('TouringEvent').doc(eventId).update({
      NumberOfAccept: db.FieldValue.increment(-1),
    });
  } catch (err) {
    error = err instanceof Error ? err : badImplementationException(err);
  }
  if (error) {
    logger.error(error);
    return Promise.reject(error);
  } else {
    logger.info('leaveTouring executed in serivces');
    return Promise.resolve('success');
  }
}