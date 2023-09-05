import { Request, Response, NextFunction } from 'express';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { logger } from 'firebase-functions/v1';
import { adminauth, auth, db } from '../../../firebase/config';
import { decodeJwt, encodeJwt } from '../../../utils/jwt';

import * as service from './myGarage.service';
import { ERROR } from '../../../utils/ApiErrorStructure';
import { myGarageMessages } from './myGarage.message';
import dayjs = require('dayjs');
import { async } from '@firebase/util';
import { badImplementationException, pageNoFoundException } from '../../../utils/apiErrorHandler';

export const userProfile = async (req: Request, res: Response, next: NextFunction) => {
    try{
        logger.info('userProfile');
        const userId = req.params.userID;
        const user = await service.getUserProfile(userId);
        if( user === "success" ){
            return res.status(200).json({
                status: 200,
                message: "user found successfully",
            });
        }else{
            return res.status(404).json({
                status: 404,
                message: myGarageMessages.notFound,
            });
        }
    }catch(err){
        return next(badImplementationException(err));
    }
}


export const listOfTouring = async (req: Request, res: Response, next: NextFunction) => {
    try{
        //query offset 
        const offset = req.query.offset;
        const limit = req.query.limit;
        const userId = req.params.userID;
        const data = await service.listOfTouring(offset, userId);
        if( data === "success" ){
            return res.status(200).json({
                status: 200,
                message: "user found successfully",
            });
        }else{
            return res.status(404).json({
                status: 404,
                message: myGarageMessages.notFound,
            });
        }
    }catch(err){
        return next(badImplementationException(err));
    }
}


export const listOfPosts = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const offset = req.query.offset;
        const limit = req.query.limit;
        const userId = req.params.userID;
        const data = await service.listOfPosts(offset, userId);
        if( data === "success" ){
            return res.status(200).json({
                status: 200,
                message: "user found successfully",
            });
        }else{
            return res.status(404).json({
                status: 404,
                message: myGarageMessages.notFound,
            });
        }
    }catch(err){
        return next(badImplementationException(err));
    }
}


export const updateUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try{
        logger.info('updateUserProfile');
        const userId = req.params.userID;
        const { ImageUrl,nickName } = req.body;
        const user = await service.updateUserProfile(userId,ImageUrl,nickName);
        if( user === "success" ){
            return res.status(200).json({
                status: 200,
                message: "user found successfully",
            });
        }else{
            return res.status(404).json({
                status: 404,
                message: myGarageMessages.notFound,
            });
        }
    }catch(err){
        return next(badImplementationException(err));
    }
}