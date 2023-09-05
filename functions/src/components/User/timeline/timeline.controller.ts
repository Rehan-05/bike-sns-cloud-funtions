import { Request, Response, NextFunction } from 'express';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { logger } from 'firebase-functions/v1';
import { adminauth, auth, db } from '../../../firebase/config';
import { decodeJwt, encodeJwt } from '../../../utils/jwt';

import * as service from './timeline.service';
import { ERROR } from '../../../utils/ApiErrorStructure';
import { timeLineMessages } from './timeline.message';
import dayjs = require('dayjs');
import { async } from '@firebase/util';


export const dailyPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info('Daily post request received');
      const { id } = req.user;
      const { title, category, tag, bike, image } = req.body;
      const newdata = await service.dailyPost(id, title, category, tag, bike, image);
      if (newdata === 'success') {
        logger.info(`Daily post created successfully`);
        res.status(200).json({
          message: 'Daily post created successfully',
        });
      } else {
        logger.info(`Daily post not created successfully`);
        res.status(500).json({
          message: 'Something went wrong',
        });
      }
    } catch (err: any) {
      logger.error(err);
    }
  };


  export const editDailyPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      logger.info('Edit post request received');
      const { id } = req.user;
      const { postId } = req.params;
      const { title, category, tag, bike, image } = req.body;
      const editdata = await service.editDailyPost(id, postId, title, category, tag, bike, image);
      if (editdata === 'success') {
        logger.info(`Daily post edit successfully`);
        res.status(200).json({
          message: 'Daily post edit successfully',
        });
      } else {
        logger.info(`Daily post not edit successfully`);
        res.status(500).json({
          message: 'Something went wrong',
        });
      }
    } catch (err: any) {
      logger.error(err);
      return res.status(500).json(ERROR(timeLineMessages.internalServerError, 500, 1001));
    }
  };
  


export const searchTimelinePosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { offset, keyword } = req.query;
    const { uid } = req.user;
    const posts = await service.searchTimelinePosts(Number(offset), keyword as string, uid);
    res.status(200).json({ posts });
  } catch (err: any) {
    logger.error(err);
    return res.status(500).json(ERROR(timeLineMessages.internalServerError, 500, 1001));
  }
};

export const listOfTimelinePosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { offset } = req.query;
        const { uid } = req.user;
        const posts = await service.listOfTimelinePosts(Number(offset), uid);
        res.status(200).json({ posts });
    } catch (err: any) {
        logger.error(err);
        return res.status(500).json(ERROR(timeLineMessages.internalServerError, 500, 1001));
    }
};


export const postDetail = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { postId } = req.params;
        const { uid } = req.user;
        const post = await service.postDetail(postId, uid);
        res.status(200).json({ post });
    } catch (err: any) {
        logger.error(err);
        return res.status(500).json(ERROR(timeLineMessages.internalServerError, 500, 1001));
    }
};


export const commentOnPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { postId } = req.params;
        const { uid } = req.user;
        const { image,text } = req.body;
        const post = await service.commentOnPost(postId, uid, image, text);
        res.status(200).json({ post });
    } catch (err: any) {
        logger.error(err);
        return res.status(500).json(ERROR(timeLineMessages.internalServerError, 500, 1001));
    }
};


export const  deleteCommentOnPost = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const { postId, commentId } = req.params;
        const { uid } = req.user;
        const post = await service.deleteCommentOnPost(postId, uid, commentId);
        res.status(200).json({ post });
    } catch (err: any) {
        logger.error(err);
        return res.status(500).json(ERROR(timeLineMessages.internalServerError, 500, 1001));
    }
}


export const likePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { postId } = req.params;
        const { uid } = req.user;
        const post = await service.likePost(postId, uid);
        res.status(200).json({ post });
    } catch (err: any) {
        logger.error(err);
        return res.status(500).json(ERROR(timeLineMessages.internalServerError, 500, 1001));
    }
};


export const unlikePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { postId } = req.params;
        const { uid } = req.user;
        const post = await service.unlikePost(postId, uid);
        res.status(200).json({ post });
    } catch (err: any) {
        logger.error(err);
        return res.status(500).json(ERROR(timeLineMessages.internalServerError, 500, 1001));
    }
};

export const likeComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { postId, commentId } = req.params;
        const { uid } = req.user;
        const post = await service.likeComment(postId, uid, commentId);
        res.status(200).json({ post });
    } catch (err: any) {
        logger.error(err);
        return res.status(500).json(ERROR(timeLineMessages.internalServerError, 500, 1001));
    }
};

export const unlikeComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { postId, commentId } = req.params;
        const { uid } = req.user;
        const post = await service.unlikeComment(postId, uid, commentId);
        res.status(200).json({ post });
    } catch (err: any) {
        logger.error(err);
        return res.status(500).json(ERROR(timeLineMessages.internalServerError, 500, 1001));
    }
};
