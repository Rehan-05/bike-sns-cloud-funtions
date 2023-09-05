"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlikeComment = exports.likeComment = exports.unlikePost = exports.likePost = exports.deleteCommentOnPost = exports.commentOnPost = exports.postDetail = exports.listOfTimelinePosts = exports.searchTimelinePosts = exports.editDailyPost = exports.dailyPost = void 0;
const dayjs = require("dayjs");
const v1_1 = require("firebase-functions/v1");
const config_1 = require("../../../firebase/config");
const apiErrorHandler_1 = require("../../../utils/apiErrorHandler");
const dailyPost = async (id, title, category, tag, bike, image) => {
    let error;
    try {
        const post = await config_1.db.collection('User_Posts').add({
            uid: id,
            title: title,
            category: category,
            tag: tag,
            bike: bike,
            image: image,
            createdAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            updatedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        });
    }
    catch (err) {
        error = err instanceof Error ? err : (0, apiErrorHandler_1.badImplementationException)(err);
    }
    if (error) {
        v1_1.logger.error(error);
        return Promise.reject(error);
    }
    else {
        v1_1.logger.info('Post executed in serivces for creation');
        return Promise.resolve('success');
    }
};
exports.dailyPost = dailyPost;
const editDailyPost = async (id, postId, title, category, tag, bike, image) => {
    let error;
    try {
        const data = await config_1.db.collection('User_Posts').doc(postId).update({
            uid: id,
            title: title,
            category: category,
            tag: tag,
            bike: bike,
            image: image,
        });
    }
    catch (err) {
        error = err instanceof Error ? err : (0, apiErrorHandler_1.badImplementationException)(err);
    }
    if (error) {
        v1_1.logger.error(error);
        return Promise.reject(error);
    }
    else {
        v1_1.logger.info('Edit post executed in serivces');
        return Promise.resolve('success');
    }
};
exports.editDailyPost = editDailyPost;
const searchTimelinePosts = async (offset, keyword, uid) => {
    try {
        const posts = await config_1.db
            .collection('User_Posts')
            .where('keywords', 'array-contains', keyword)
            .orderBy('createdAt', 'title')
            .limit(10)
            .offset(offset)
            .get();
        const postsData = posts.docs.map((post) => {
            const data = post.data();
            const { id } = post;
            const { createdAt } = data;
            return Object.assign(Object.assign({ id }, data), { createdAt: dayjs(createdAt.toDate()).format('DD/MM/YYYY') });
        });
        const postsWithLike = await Promise.all(postsData.map(async (post) => {
            const { id } = post;
            const like = await config_1.db.collection('likes').where('postId', '==', id).where('userId', '==', uid).get();
            if (like.empty) {
                return Object.assign(Object.assign({}, post), { isLiked: false });
            }
            else {
                return Object.assign(Object.assign({}, post), { isLiked: true });
            }
        }));
        return postsWithLike;
    }
    catch (err) {
        v1_1.logger.error(err);
        throw new apiErrorHandler_1.HttpException(500, 'Internal server error', 1001);
    }
};
exports.searchTimelinePosts = searchTimelinePosts;
const listOfTimelinePosts = async (offset, uid) => {
    try {
        const posts = await config_1.db.collection('User_Posts').orderBy('createdAt', 'title').limit(10).offset(offset).get();
        const postsData = posts.docs.map((post) => {
            const data = post.data();
            const { id } = post;
            const { createdAt } = data;
            return Object.assign(Object.assign({ id }, data), { createdAt: dayjs(createdAt.toDate()).format('DD/MM/YYYY') });
        });
        const postsWithLike = await Promise.all(postsData.map(async (post) => {
            const { id } = post;
            const like = await config_1.db.collection('likes').where('postId', '==', id).where('userId', '==', uid).get();
            if (like.empty) {
                return Object.assign(Object.assign({}, post), { isLiked: false });
            }
            else {
                return Object.assign(Object.assign({}, post), { isLiked: true });
            }
        }));
        return postsWithLike;
    }
    catch (err) {
        v1_1.logger.error(err);
        throw new apiErrorHandler_1.HttpException(500, 'Internal server error', 1001);
    }
};
exports.listOfTimelinePosts = listOfTimelinePosts;
const postDetail = async (postId, uid) => {
    try {
        const post = await config_1.db.collection('User_Posts').doc(postId).get();
        const data = post.data();
        const { createdAt } = data;
        const postData = Object.assign(Object.assign({ id: post.id }, data), { createdAt: dayjs(createdAt.toDate()).format('DD/MM/YYYY') });
        const like = await config_1.db.collection('likes').where('postId', '==', postId).where('userId', '==', uid).get();
        if (like.empty) {
            return Object.assign(Object.assign({}, postData), { isLiked: false });
        }
        else {
            return Object.assign(Object.assign({}, postData), { isLiked: true });
        }
    }
    catch (err) {
        v1_1.logger.error(err);
        throw new apiErrorHandler_1.HttpException(500, 'Internal server error', 1001);
    }
};
exports.postDetail = postDetail;
const commentOnPost = async (postId, uid, image, text) => {
    try {
        const user = await config_1.db.collection('User').doc(uid).get();
        const userData = user.data();
        const { name, avatar } = userData;
        const comment = await config_1.db.collection('Post_Comment').add({
            postId,
            uid,
            name,
            avatar,
            image,
            text,
            createdAt: config_1.adminauth.Timestamp.fromDate(new Date()),
        });
        return comment.id;
    }
    catch (err) {
        v1_1.logger.error(err);
        throw new apiErrorHandler_1.HttpException(500, 'Internal server error', 1001);
    }
};
exports.commentOnPost = commentOnPost;
const deleteCommentOnPost = async (postId, uid, commentId) => {
    try {
        const comment = await config_1.db.collection('Post_Comment').doc(commentId).get();
        const commentData = comment.data();
        const { uid: commentUid } = commentData;
        if (uid !== commentUid) {
            throw new apiErrorHandler_1.HttpException(403, 'Forbidden', 1001);
        }
        await config_1.db.collection('Post_Comment').doc(commentId).delete();
        return;
    }
    catch (err) {
        v1_1.logger.error(err);
        throw new apiErrorHandler_1.HttpException(500, 'Internal server error', 1001);
    }
};
exports.deleteCommentOnPost = deleteCommentOnPost;
const likePost = async (postId, uid) => {
    try {
        const like = await config_1.db.collection('Like_Posts').add({
            postId,
            uid,
            createdAt: config_1.adminauth.Timestamp.fromDate(new Date()),
        });
        return like.id;
    }
    catch (err) {
        v1_1.logger.error(err);
        throw new apiErrorHandler_1.HttpException(500, 'Internal server error', 1001);
    }
};
exports.likePost = likePost;
const unlikePost = async (postId, uid) => {
    try {
        const like = await config_1.db.collection('Like_Posts').where('postId', '==', postId).where('uid', '==', uid).get();
        if (like.empty) {
            throw new apiErrorHandler_1.HttpException(404, 'Not found', 1001);
        }
        like.forEach(async (doc) => {
            await config_1.db.collection('Like_Posts').doc(doc.id).delete();
        });
        return;
    }
    catch (err) {
        v1_1.logger.error(err);
        throw new apiErrorHandler_1.HttpException(500, 'Internal server error', 1001);
    }
};
exports.unlikePost = unlikePost;
const likeComment = async (postId, uid, commentId) => {
    try {
        const like = await config_1.db.collection('Like_Comment').add({
            postId,
            uid,
            commentId,
            createdAt: config_1.adminauth.Timestamp.fromDate(new Date()),
        });
        return like.id;
    }
    catch (err) {
        v1_1.logger.error(err);
        throw new apiErrorHandler_1.HttpException(500, 'Internal server error', 1001);
    }
};
exports.likeComment = likeComment;
const unlikeComment = async (postId, uid, commentId) => {
    try {
        const like = await config_1.db.collection('Like_Comment').where('postId', '==', postId).where('uid', '==', uid).where('commentId', '==', commentId).get();
        if (like.empty) {
            throw new apiErrorHandler_1.HttpException(404, 'Not found', 1001);
        }
        like.forEach(async (doc) => {
            await config_1.db.collection('Like_Comment').doc(doc.id).delete();
        });
        return;
    }
    catch (err) {
        v1_1.logger.error(err);
        throw new apiErrorHandler_1.HttpException(500, 'Internal server error', 1001);
    }
};
exports.unlikeComment = unlikeComment;
//# sourceMappingURL=timeline.service.js.map