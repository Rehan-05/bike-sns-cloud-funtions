import * as express from 'express';

import authComponent from './auth';
import accountComponent from './account';
// import dashboardComponent from './dashboard';
const router = express.Router();

router.use('/auth', authComponent);
router.use('/account', accountComponent);
// router.use('/dashboard', dashboardComponent);


export default router;
