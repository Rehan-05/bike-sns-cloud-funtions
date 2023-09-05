import * as jwt from 'jsonwebtoken';
import { INVALID_JWT_TOKEN } from '../constants/errorMessage';
import { JWT_SECRET } from '../middlewares/env';
import { validationException } from './apiErrorHandler';

export const encodeJwt = (payload: string | Record<string, unknown> | Buffer, expiresIn: string | number) => {
  const jwtoken = jwt.sign({ payload }, JWT_SECRET, { expiresIn });
  return jwtoken;
};

export const decodeJwt = (jwtoken: string) => {
  try {
    const decode = jwt.verify(jwtoken, JWT_SECRET);

    if (typeof decode === 'string') throw validationException(INVALID_JWT_TOKEN);

    return Promise.resolve(decode);
  } catch (err) {
    return Promise.reject({ message: INVALID_JWT_TOKEN, code: 400, err });
  }
};
