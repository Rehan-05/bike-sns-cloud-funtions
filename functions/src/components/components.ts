import * as express from 'express';

import adminComponent from './admin';
import userComponent from './User';

const router = express.Router();

router.use('/admin', adminComponent);
router.use('/user', userComponent);

export default router;
