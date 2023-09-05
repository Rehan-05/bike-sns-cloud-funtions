import * as dotenv from 'dotenv';
dotenv.config();

import * as functions from 'firebase-functions';
import express from 'express';
import cors from 'cors';
import { registerComponents } from './components';
import { errorHandler } from './middlewares/errorHandler';
import { createAdminUser } from './components/admin/auth/auth.service';
import { swaeger } from './middlewares/Swagger.config';

const app = express();

const whitelist = ['http://localhost:3000'];

const corsOptions: cors.CorsOptions = {
  origin(origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
registerComponents(app);
errorHandler(app);
  swaeger(app);

// listen port 5000
// app.listen(5000, () => {
//   console.log('Server is running on port 5000');
//   createAdminUser();
// });

module.exports.api = functions.region('asia-northeast1').https.onRequest(app);
