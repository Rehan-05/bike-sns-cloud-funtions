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

export const getUserProfile = async (userID: string) => {
  try {
    logger.info('getUserProfile');
    const user = await db.collection('User').doc(userID).get();
    if (user.exists) {
      return 'success';
    } else {
      return 'fail';
    }
  } catch (err) {
    return next(badImplementationException(err));
  }
};

function next(arg0: HttpException) {
  throw new Error('Function not implemented.');
}

export const listOfTouring = async (offset: any, userID: string) => {
  try {
    //get the user list of touring
    const user = await db.collection('User').doc(userID).get();
    if (user.exists) {
      const touring = await db
        .collection('TouringEvent')
        .where('userID', '==', userID)
        .orderBy('createdAt', 'desc')
        .limit(10)
        .offset(offset)
        .get();
      if (touring.empty) {
        return 'fail';
      } else {
        return 'success';
      }
    }
  } catch (err) {
    return next(badImplementationException(err));
  }
};

export const listOfPosts = async (offset: any, userID: string) => {
  try {
    logger.info('listOfPosts');
    //get list of user posts
    const user = await db.collection('User').doc(userID).get();
    if (user.exists) {
      const posts = await db
        .collection('User_Posts')
        .where('userID', '==', userID)
        .orderBy('createdAt', 'desc')
        .limit(10)
        .offset(offset)
        .get();
      if (posts.empty) {
        return 'fail';
      } else {
        return 'success';
      }
    }
  } catch (err) {
    return next(badImplementationException(err));
  }
};

//update user profile
export const updateUserProfile = async (userID: string, ImageUrl: string, nickName: string) => {
  try {
    logger.info('update User Profile Data');
    const user = await db.collection('User').doc(userID).get();
    if (user.exists) {
      const update = await db.collection('User').doc(userID).update({
        ImageUrl: ImageUrl,
        nickName: nickName,
      });
      return 'success';
    }else{
      return 'fail';
    }
  } catch (err) {
    return next(badImplementationException(err));
  }
};
