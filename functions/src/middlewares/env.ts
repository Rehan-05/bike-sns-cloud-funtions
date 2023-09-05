const ENVIRONMENT = process.env.NODE_ENV;
export const IS_PRODUCTION = ENVIRONMENT === 'production';

if (!process.env.JWT_SECRET) {
  console.warn('JWT_SECRET IS UNDEFINED AT ENV FILE');
  process.exit(1);
}

const JWT_SECRET = process.env.JWT_SECRET;

export { JWT_SECRET };
