/**
 * @description Check kana
 */
/* eslint-disable no-irregular-whitespace */
export const REGEXP_NAME = /^[ァ-ンヴー　]*$/;
/**
 * @description YYYY-MM-DD
 */
export const REGEXP_BIRTH = /^\d{4}-(0[1-9]|1[0-2])-([0-2]\d|3[01])$/;
/**
 * @description NN
 */
export const REGEXP_TWO_DIGITS = /^\d{2}$/;
/**
 * @description At least one special char, one lowercase, one uppercase, one number
 */
export const REGEXP_PASSWORD =
  /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;
/**
 * @description YYYY-MM-DD HH:MM:SS+HH:MM
 */
export const REGEXP_DATETIME =
  /^\d{4}-(0[1-9]|1[0-2])-([0-2]\d|3[01])T(0\d|1\d|2[0-3]):[0-5]\d:[0-5]\d(\+|-)(0\d|1\d|2[0-3]):[0-5]\d$/;
