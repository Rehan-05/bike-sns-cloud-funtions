import * as express from 'express';

import authComponent from './auth';
import userProfileComponent from './myProfile';
import threadComponent from './thread';
import timelineComponent from './timeline';
import touringComponent from './touring';
const router = express.Router();

router.use('/auth', authComponent);
router.use('/myProfile', userProfileComponent);
router.use('/thread',threadComponent);
router.use('/timeline',timelineComponent);
router.use('/touring',touringComponent);
export default router;
