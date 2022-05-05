import moment, { Moment } from 'moment';

export const HOURLY_RATE = 'HOURLY_RATE';
export const START_TIME = 'START_TIME';
export const END_TIME = 'END_TIME';
export const CURRENCY = 'CURRENCY';

export function getTimeFromLocalStorage(
  key: string,
  defaultHour: number,
  defaultMinute: number
): Moment {
  let time: Moment;

  if (localStorage.getItem(key)) {
    const hours = parseInt(localStorage.getItem(key)?.split(':')[0] as string, 10);
    const minutes = parseInt(localStorage.getItem(key)?.split(':')[1] as string, 10);
    time = moment().set('hours', hours).set('minutes', minutes).set('seconds', 0);
  } else {
    time = moment().set('hours', defaultHour).set('minutes', defaultMinute).set('seconds', 0);
    localStorage.setItem(key, time.format('HH:mm'));
  }

  return time;
}

export function getNumberFromLocalStorage(key: string, defaultNumber: number): number {
  if (localStorage.getItem(key)) {
    return parseFloat(localStorage.getItem(key) as string);
  }
  localStorage.setItem(key, defaultNumber.toString());
  return defaultNumber;
}

export function getStringFromLocalStorage(key: string, defaultString: string): string {
  if (localStorage.getItem(key)) {
    return localStorage.getItem(key) as string;
  }
  localStorage.setItem(key, defaultString);
  return defaultString;
}
