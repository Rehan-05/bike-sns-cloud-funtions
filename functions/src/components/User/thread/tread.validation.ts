import { Schema } from 'express-validator';
import { VALIDATION_ACCOUNT_EMAIL, VALIDATION_ACCOUNT_PASSWORD, VALIDATION_ID, VALIDATION_NICK_NAME, VALIDATION_POST_IMAGE, VALIDATION_POST_TEXT, VALIDATION_USER_IMAGE } from '../../../constants/validation';


export const ADDTWEETTHREAD_SCHEMA : Schema = {
    postText: VALIDATION_POST_TEXT('body'),
    postImage: VALIDATION_POST_IMAGE('body'),
    userImage: VALIDATION_USER_IMAGE('body'),
    nickName: VALIDATION_NICK_NAME('body'),
}