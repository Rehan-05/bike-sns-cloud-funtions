import * as express from 'express';
import { checkSchema } from 'express-validator';

import { ACCOUNT_SCHEMA } from './account.validation';

import * as controller from './account.controller';
import { checkValidation } from '../../../utils/validation';
import { authAdmin } from '../../../middlewares/verifyToken.middleware';

const router = express.Router();

router.put('', checkSchema(ACCOUNT_SCHEMA), checkValidation, authAdmin, controller.updateAccount);

export default router;
