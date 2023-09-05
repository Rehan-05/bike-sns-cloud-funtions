import { Request, Response, NextFunction } from 'express';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { logger } from 'firebase-functions/v1';
import { adminauth, auth, db } from '../../../firebase/config';
import { decodeJwt, encodeJwt } from '../../../utils/jwt';

import * as service from './thread.service';
import { ERROR } from '../../../utils/ApiErrorStructure';
import { threadMessages } from './thread.message';
import dayjs = require('dayjs');
import { async } from '@firebase/util';



export const addTweetThread = async (req: Request, res: Response, next: NextFunction) => {
}