import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
// import { createAdminUser } from './admin/auth/auth.service';

import components from './components';

export const registerComponents = (app: express.Application) => {
  app.use('/api', components);

  app.on('listening', () => {
    console.info('Listening on port 5000');
  });
  app.get('/', (req: Request, res: Response, next: NextFunction) => {
    const { isError } = req.query;

    if (!isError) res.status(200).json('Hello World');
    else next(new Error('Testing error handling'));
  });
};
