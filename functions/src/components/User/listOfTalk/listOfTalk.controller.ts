import { Request, Response, NextFunction } from 'express';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { logger } from 'firebase-functions/v1';
import { adminauth, auth, db } from '../../../firebase/config';
import { decodeJwt, encodeJwt } from '../../../utils/jwt';

import * as service from './listOfTalk.service';
import { ERROR } from '../../../utils/ApiErrorStructure';
import { listOfTalkMessages } from './listOfTalk.message';
import dayjs = require('dayjs');
import { async } from '@firebase/util';


