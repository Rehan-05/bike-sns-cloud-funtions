import * as ERROR from '../constants/errorMessage';

export class HttpException extends Error {
  statusCode?: number;
  message: string;
  errorMessage: string;
  subStatusCode?: number;

  constructor(statusCode: number, message: string, subStatusCode: number) {
    super(message);
    this.statusCode = statusCode || 500;
    this.message = message;
    this.errorMessage = message;
    this.subStatusCode = subStatusCode;
  }
}

export const validationException = (errors: any) => {
  errors ? console.error(errors) : console.error(ERROR.VALIDATION);
  return new HttpException(400, errors.message || ERROR.VALIDATION, 1001);
};

export const dataNotExistException = (error: any) => {
  error ? console.error(error) : console.error(ERROR.DATANOTFOUND);
  return new HttpException(400, error.message || ERROR.DATANOTFOUND, 1002);
};

export const userNotActivateException = (error: any) => {
  error ? console.error(error) : console.error(ERROR.USERNOTACTIVATE);
  return new HttpException(400, error.message || ERROR.USERNOTACTIVATE, 1003);
};

export const dataExceedException = (error: any) => {
  error ? console.error(error) : console.error(ERROR.DATAEXCEED);
  return new HttpException(400, error.message || ERROR.DATAEXCEED, 1004);
};

export const payjpInvalidCardException = (error: any) => {
  error ? console.error(error) : console.error(ERROR.PAYJP_INVALID_CARD);
  return new HttpException(400, ERROR.PAYJP_INVALID_CARD, 1005);
};

export const unauthorizedException = (error: any) => {
  error ? console.error(error) : console.error(ERROR.UNAUTH);
  return new HttpException(401, error.message || ERROR.UNAUTH, 2001);
};
export const dataConflictException = (error: any) => {
  error ? console.error(error) : console.error(ERROR.CONFLICT);

  return new HttpException(409, error.message || ERROR.CONFLICT, 3001);
};
export const emailConflictException = (error: any) => {
  error ? console.error(error) : console.error(ERROR.CONFLICT);
  return new HttpException(409, error.message || ERROR.CONFLICT, 2002);
};

export const pageNoFoundException = (error: any) => {
  error ? console.error(error) : console.error(ERROR.PAGENOTFOUND);
  return new HttpException(404, error.message || ERROR.PAGENOTFOUND, 4000);
};

export const badImplementationException = (error: any) => {
  error ? console.error(error) : console.error(ERROR.BADIMPLEMENTATION);
  return new HttpException(500, error.message || ERROR.BADIMPLEMENTATION, 5000);
};
