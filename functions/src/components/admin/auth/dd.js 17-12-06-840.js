import dayjs = require('dayjs');
import { logger } from 'firebase-functions/v1';
import { adminauth, auth, db } from '../../../firebase/config';
import { badImplementationException, HttpException } from '../../../utils/apiErrorHandler';

import { verifyPasswordResetCode,confirmPasswordReset,sendPasswordResetEmail } from 'firebase/auth';



// create a function to create a new user
export const createAdminUser = async () => {
  try {
    // check if the admin exist then stop execution
    const admin = await db.collection('Admin').where('email', '==', "hamsaeed1122@gmail.com").get();
    if (!admin.empty) {
      logger.info('Admin already exist');
      return;
    };

    const user = await adminauth.createUser({
      email:"hamsaeed1122@gmail.com",
      password:"Newton@123",
    });
    logger.info(`User created with uid: ${user.uid}`);
    // also add this user to admin collection in firestore
    await adminauth.setCustomUserClaims(user.uid, { admin: true });
    db.collection('Admin').doc(user.uid).set({
      admin_id: user.uid,
      email:"hamsaeed1122@gmail.com",
      privilege: 'admin',
      password:"Newton@123",
      created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      deleted_at: null,
    });

    db.collection('Agency').doc(user.uid).set({
      agency_id: user.uid,
      email:"hamsaeed1122@gmail.com",
      privilege: 'admin',
      name: 'Admin',
      password:"Newton@123",
      "status": "active",
      created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      deleted_at: null,
    });
    return user;
  } catch (err) {
    logger.error(err);
  }
};


export const forgotPassword = async (email: string) => {
  let error: Error | HttpException | undefined;
  try {
    await sendPasswordResetEmail(auth,email);
  } catch (err) {
    error = err instanceof Error ? err : badImplementationException(err);
  }
  if (error) {
    logger.error(error);
    return Promise.reject(error);
  } else {
    logger.info('Password reset link sent');
    return Promise.resolve("success");
  }
};

export const updatePassword = async (password: string, token: string) => {
  let error: Error | HttpException | undefined;
  try {
    await confirmPasswordReset(auth, token, password);
    logger.info(`Password updated for`);    
  } catch (err) {
    error = err instanceof Error ? err : badImplementationException(err);
  }

  if (error) {
    return Promise.reject(error);
  } else {
    return Promise.resolve("success");
  }
};
