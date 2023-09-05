import dayjs from 'dayjs';
import { OpUnitType, QUnitType } from 'dayjs';
import { MONTHS, TIMEZONE } from '../constants/rules';
import { badImplementationException, validationException } from './apiErrorHandler';
import pluginTz from 'dayjs/plugin/timezone';
import pluginUtc from 'dayjs/plugin/utc';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { Months } from '../@types/validation';

dayjs.extend(pluginTz);
dayjs.extend(pluginUtc);
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const getTime = (time: string | undefined, keepLocalTime?: boolean) => {
  const dayTime = keepLocalTime ? dayjs(time).tz(TIMEZONE, true) : dayjs(time).tz(TIMEZONE);

  return dayTime;
};

export const getStartOf = (time: string, unit: OpUnitType, keepLocalTime?: boolean) => {
  const dayTime = getTime(time, keepLocalTime);

  const startOf = dayTime.startOf(unit);

  return startOf;
};

export const getEndOf = (time: string, unit: OpUnitType, keepLocalTime?: boolean) => {
  const dayTime = getTime(time, keepLocalTime);

  return dayTime.endOf(unit);
};

export const get1msBefore = (time: string, keepLocalTime?: boolean) => {
  const dayTime = getTime(time, keepLocalTime);

  return dayTime.subtract(1, 'millisecond');
};

export const get1msAfter = (time: string, keepLocalTime?: boolean) => {
  const dayTime = getTime(time, keepLocalTime);

  return dayTime.add(1, 'millisecond');
};

export const getNextDay = (time: string, keepLocalTime?: boolean) => {
  const dayTime = getTime(time, keepLocalTime);

  const endOfDay = dayTime.endOf('day');

  return endOfDay.add(1, 'millisecond');
};

export const getNextMonth = (time: string, keepLocalTime?: boolean) => {
  const dayTime = getTime(time, keepLocalTime);

  const endOfMonth = dayTime.endOf('month');

  return endOfMonth.add(1, 'millisecond');
};

export const getCurrentTime = (keepLocalTime?: boolean) => {
  const dayCurrentTime = getTime(undefined, keepLocalTime);

  return dayCurrentTime;
};

export const compareAIsAfterB = (time1: string, time2: string, keepLocalTime?: boolean) => {
  const dayTime1 = getTime(time1, keepLocalTime);

  const dayTime2 = getTime(time2, keepLocalTime);

  return dayTime1.isAfter(dayTime2);
};

export const compareAIsSameOrAfterB = (time1: string, time2: string, keepLocalTime?: boolean) => {
  const dayTime1 = getTime(time1, keepLocalTime);

  const dayTime2 = getTime(time2, keepLocalTime);

  return dayTime1.isSameOrAfter(dayTime2);
};

export const compareAIsBeforeTimeB = (time1: string, time2: string, keepLocalTime?: boolean) => {
  const dayTime1 = getTime(time1, keepLocalTime);

  const dayTime2 = getTime(time2, keepLocalTime);

  return dayTime1.isBefore(dayTime2);
};

export const compareAIsSameOrBeforeTimeB = (time1: string, time2: string, keepLocalTime?: boolean) => {
  const dayTime1 = getTime(time1, keepLocalTime);

  const dayTime2 = getTime(time2, keepLocalTime);

  return dayTime1.isSameOrBefore(dayTime2);
};

/**
 *
 * @param time1 bigger than time2
 * @param time2 bigger than time1
 * @param {QUnitType | OpUnitType} unit
 * @param {boolean} keepLocalTime
 * @returns
 */
export const getTimeDifference = (
  time1: string,
  time2: string,
  unit: QUnitType | OpUnitType,
  keepLocalTime?: boolean,
) => {
  const dayTime1 = getTime(time1, keepLocalTime);

  const dayTime2 = getTime(time2, keepLocalTime);

  const diff = dayTime1.diff(dayTime2, unit, true);

  if (diff < 0) throw badImplementationException(new Error('time2 should be bigger than time1'));

  return diff;
};

export const getSpecificMonth = (month: Months) => {
  const index = MONTHS.indexOf(month);
  if (index === -1) throw validationException(new Error('You must send month in English'));
  return dayjs().tz(TIMEZONE).month(index);
};

export const isSame = (time1: string, time2: string, unit: OpUnitType) => {
  return dayjs(time1).tz(TIMEZONE).isSame(time2, unit);
};
