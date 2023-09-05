import * as express from 'express';
import { checkSchema } from 'express-validator';

// import { PROFILEDATA_SCHEMA } from './tread.validation';

import * as controller from './timeline.controller';
import { checkValidation } from '../../../utils/validation';
import { authUser } from '../../../middlewares/verifyToken.middleware';
// import { isUser } from '../../../utils/auth';
const router = express.Router();

router.get('/timeline/posts',authUser, controller.searchTimelinePosts);

export default router;
