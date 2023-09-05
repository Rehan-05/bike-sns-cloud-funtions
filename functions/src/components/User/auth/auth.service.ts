import dayjs = require('dayjs');
const bcrypt = require('bcrypt');
import { logger } from 'firebase-functions/v1';
import { adminauth, auth, db } from '../../../firebase/config';
import { badImplementationException, HttpException } from '../../../utils/apiErrorHandler';

import { verifyPasswordResetCode, confirmPasswordReset, sendPasswordResetEmail } from 'firebase/auth';
import { sendMessage } from '../../../utils/sendGrid';
import { decodeJwt, encodeJwt } from '../../../utils/jwt';

// create a function to create a new user
export const createAdminUser = async () => {
  try {
    // check if the admin exist then stop execution
    const admin = await db.collection('Admin').where('email', '==', 'hamsaeed1122@gmail.com').get();
    if (!admin.empty) {
      logger.info('Admin already exist');
      return;
    }

    const user = await adminauth.createUser({
      email: 'hamsaeed1122@gmail.com',
      password: 'Newton@123',
    });
    logger.info(`User created with uid: ${user.uid}`);

    await adminauth.setCustomUserClaims(user.uid, { admin: true });
    db.collection('Admin')
      .doc(user.uid)
      .set({
        admin_id: user.uid,
        email: 'hamsaeed1122@gmail.com',
        privilege: 'admin',
        password: 'Newton@123',
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
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    error = err instanceof Error ? err : badImplementationException(err);
  }
  if (error) {
    logger.error(error);
    return Promise.reject(error);
  } else {
    logger.info('Password reset link sent');
    return Promise.resolve('success');
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
    return Promise.resolve('success');
  }
};

export const verifyEmailAddress = async (email: string) => {
  let error: Error | HttpException | undefined;
  try {
    let registrationLink = 'http://localhost:5000/registration';
    let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    let expiry = dayjs().add(5, 'minute').format('YYYY-MM-DD HH:mm:ss');
    let tokenId =  await db.collection('EmailVerification_token').add({email: email, token: token, expiry: expiry });
    let link = registrationLink + '/' + tokenId.id;
    let adminEmail = `
    <div style="background-color: #F5F5F5; padding: 20px; font-family: sans-serif;">
      <div style="background-color: white; padding: 20px; border-radius: 10px;">Hi MR,<br><br>
        <p>Thank you for registering with us. Please click on the link below to complete your registration.</p>
        <a href="${link}">Click here to complete your registration</a>
        <br><br>
        <p>Regards,<br>
        Admin</p>
      </div>
    </div>
    `;

    await sendMessage({ html: adminEmail, subject: 'Registration Link', to: email, from: 'khan123@gmail.com' });
    //hum nye is token ko save bhi karwana hai
  } catch (err) {
    error = err instanceof Error ? err : badImplementationException(err);
  }
  if (error) {
    logger.error(error);
    return Promise.reject(error);
  } else {
    logger.info('Password reset link sent');
    return Promise.resolve('success');
  }
};

// create a function to create a new user

export const registrationUser = async (
  email: string,
  nickName: string,
  gender: string,
  phone: number,
  birthDay: string,
  province: string,
  password: string,
) => {
  let error: Error | HttpException | undefined;
  try {
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await adminauth.createUser({
      email: email,
      password: password,
    });
    console.log(`User created with uid: ${user.uid}`);
    db.collection('User')
      .doc(user.uid)
      .set({
        user_id: user.uid,
        email: email,
        nickName: nickName,
        gender: gender,
        phone: phone,
        birthDay: birthDay,
        province: province,
        password: password,
        created_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        deleted_at: null,
      });
  } catch (err) {
    error = err instanceof Error ? err : badImplementationException(err);
  }
  if (error) {
    logger.error(error);
    return Promise.reject(error);
  } else {
    logger.info('Password reset link sent');
    return Promise.resolve('success');
  }
};
