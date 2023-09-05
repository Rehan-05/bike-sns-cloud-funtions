import dayjs = require('dayjs');
import { logger } from 'firebase-functions/v1';
import { adminauth, auth, db } from '../../../firebase/config';
import { badImplementationException, HttpException } from '../../../utils/apiErrorHandler';

import { updatePassword, signInWithEmailAndPassword } from 'firebase/auth';
import { async } from '@firebase/util';


export const dailyPost = async (
  id: string,
  title: string,
  category: string,
  tag: string,
  bike: string,
  image: string,
) => {
  let error: Error | HttpException | undefined;
  try {
    const post = await db.collection('User_Posts').add({
      uid: id,
      title: title,
      category: category,
      tag: tag,
      bike: bike,
      image: image,
      createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    });
  } catch (err) {
    error = err instanceof Error ? err : badImplementationException(err);
  }
  if (error) {
    logger.error(error);
    return Promise.reject(error);
  } else {
    logger.info('Post executed in serivces for creation');
    return Promise.resolve('success');
  }
};


export const editDailyPost = async (
  id: string,
  postId: string,
  title: string,
  category: string,
  tag: string,
  bike: string,
  image: string,
) => {
  let error: Error | HttpException | undefined;
  try {
    const data = await db.collection('User_Posts').doc(postId).update({
      uid: id,
      title: title,
      category: category,
      tag: tag,
      bike: bike,
      image: image,
    });
  } catch (err) {
    error = err instanceof Error ? err : badImplementationException(err);
  }
  if (error) {
    logger.error(error);
    return Promise.reject(error);
  } else {
    logger.info('Edit post executed in serivces');
    return Promise.resolve('success');
  }
};


export const searchTimelinePosts = async (offset: number, keyword: string, uid: string) => {
  try {
    const posts = await db
      .collection('User_Posts')
      .where('keywords', 'array-contains', keyword)
      .orderBy('createdAt', 'title')
      .limit(10)
      .offset(offset)
      .get();
    const postsData = posts.docs.map((post: any) => {
      const data = post.data();
      const { id } = post;
      const { createdAt } = data;
      return {
        id,
        ...data,
        createdAt: dayjs(createdAt.toDate()).format('DD/MM/YYYY'),
      };
    });

    const postsWithLike = await Promise.all(
      postsData.map(async (post: any) => {
        const { id } = post;
        const like = await db.collection('likes').where('postId', '==', id).where('userId', '==', uid).get();
        if (like.empty) {
          return {
            ...post,
            isLiked: false,
          };
        } else {
          return {
            ...post,
            isLiked: true,
          };
        }
      }),
    );
    return postsWithLike;
  } catch (err: any) {
    logger.error(err);
    throw new HttpException(500, 'Internal server error', 1001);
  }
};

export const listOfTimelinePosts = async (offset: number, uid: string) => {
  try {
    const posts = await db.collection('User_Posts').orderBy('createdAt', 'title').limit(10).offset(offset).get();
    const postsData = posts.docs.map((post: any) => {
      const data = post.data();
      const { id } = post;
      const { createdAt } = data;
      return {
        id,
        ...data,
        createdAt: dayjs(createdAt.toDate()).format('DD/MM/YYYY'),
      };
    });
    const postsWithLike = await Promise.all(
      postsData.map(async (post: any) => {
        const { id } = post;
        const like = await db.collection('likes').where('postId', '==', id).where('userId', '==', uid).get();
        if (like.empty) {
          return {
            ...post,
            isLiked: false,
          };
        } else {
          return {
            ...post,
            isLiked: true,
          };
        }
      }),
    );
    return postsWithLike;
  } catch (err: any) {
    logger.error(err);
    throw new HttpException(500, 'Internal server error', 1001);
  }
};

export const postDetail = async (postId: string, uid: string) => {
  try {
    const post = await db.collection('User_Posts').doc(postId).get();
    const data = post.data();
    const { createdAt } = data;
    const postData = {
      id: post.id,
      ...data,
      createdAt: dayjs(createdAt.toDate()).format('DD/MM/YYYY'),
    };
    const like = await db.collection('likes').where('postId', '==', postId).where('userId', '==', uid).get();
    if (like.empty) {
      return {
        ...postData,
        isLiked: false,
      };
    } else {
      return {
        ...postData,
        isLiked: true,
      };
    }
  } catch (err: any) {
    logger.error(err);
    throw new HttpException(500, 'Internal server error', 1001);
  }
};

export const commentOnPost = async (postId: string, uid: string, image: string, text: string) => {
  try {
    const user = await db.collection('User').doc(uid).get();
    const userData = user.data();
    const { name, avatar } = userData;
    const comment = await db.collection('Post_Comment').add({
      postId,
      uid,
      name,
      avatar,
      image,
      text,
      createdAt: adminauth.Timestamp.fromDate(new Date()),
    });
    return comment.id;
  } catch (err: any) {
    logger.error(err);
    throw new HttpException(500, 'Internal server error', 1001);
  }
};

export const deleteCommentOnPost = async (postId: string, uid: string, commentId: string) => {
  try {
    const comment = await db.collection('Post_Comment').doc(commentId).get();
    const commentData = comment.data();
    const { uid: commentUid } = commentData;
    if (uid !== commentUid) {
      throw new HttpException(403, 'Forbidden', 1001);
    }
    await db.collection('Post_Comment').doc(commentId).delete();
    return;
  } catch (err: any) {
    logger.error(err);
    throw new HttpException(500, 'Internal server error', 1001);
  }
};

export const likePost = async (postId: string, uid: string) => {
  try {
    const like = await db.collection('Like_Posts').add({
      postId,
      uid,
      createdAt: adminauth.Timestamp.fromDate(new Date()),
    });
    return like.id;
  } catch (err: any) {
    logger.error(err);
    throw new HttpException(500, 'Internal server error', 1001);
  }
};

export const unlikePost = async (postId: string, uid: string) => {
  try {
    const like = await db.collection('Like_Posts').where('postId', '==', postId).where('uid', '==', uid).get();
    if (like.empty) {
      throw new HttpException(404, 'Not found', 1001);
    }
    like.forEach(async (doc: any) => {
      await db.collection('Like_Posts').doc(doc.id).delete();
    });
    return;
  } catch (err: any) {
    logger.error(err);
    throw new HttpException(500, 'Internal server error', 1001);
  }
};

export const likeComment = async (postId: string, uid: string, commentId: string) => {
   try{
    const like = await db.collection('Like_Comment').add({
      postId,
      uid,
      commentId,
      createdAt: adminauth.Timestamp.fromDate(new Date()),
    });
    return like.id;
   }catch(err:any){
    logger.error(err);
    throw new HttpException(500, 'Internal server error', 1001);
   }
};

export const unlikeComment = async (postId: string, uid: string, commentId: string) => {
  try {
    const like = await db.collection('Like_Comment').where('postId', '==', postId).where('uid', '==', uid).where('commentId', '==', commentId).get();
    if (like.empty) {
      throw new HttpException(404, 'Not found', 1001);
    }
    like.forEach(async (doc: any) => {
      await db.collection('Like_Comment').doc(doc.id).delete();
    });
    return;
  } catch (err: any) {
    logger.error(err);
    throw new HttpException(500, 'Internal server error', 1001);
  }
};
