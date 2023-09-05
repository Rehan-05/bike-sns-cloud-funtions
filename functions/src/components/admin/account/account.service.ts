import dayjs = require('dayjs');
import { logger } from 'firebase-functions/v1';
import { adminauth, auth, db } from '../../../firebase/config';
import { badImplementationException, HttpException } from '../../../utils/apiErrorHandler';

import { updatePassword, signInWithEmailAndPassword } from 'firebase/auth';

export const UpdatePassword = async (email: string, password: string, newPassword: string) => {
  let error: Error | HttpException | undefined;
  let user: any;
  try {
    user = await signInWithEmailAndPassword(auth, email, password);
    await updatePassword(user.user, newPassword);
  } catch (err) {
    error = err instanceof Error ? err : badImplementationException(err);
  }

  if (error) {
    return Promise.reject(error);
  } else {
    return Promise.resolve(user.user);
  }
};
