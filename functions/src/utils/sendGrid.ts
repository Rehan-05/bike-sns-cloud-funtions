import sgMail, { MailDataRequired } from '@sendgrid/mail';
import { logger } from 'firebase-functions/v1';
const SEND_GRID = process.env.SEND_GRID_API_KEY;
sgMail.setApiKey(SEND_GRID as string);

export const sendMessage = async (message: MailDataRequired) => {
  try {
    await sgMail.send(message);
    logger.info('Email was sent.');
    return Promise.resolve();
  } catch (err) {
    logger.error(err);
    return Promise.reject(err);
  }
};
