import { Moment } from 'moment';

export function calculateAmountEarned(
  timeStart: Moment,
  timeEnd: Moment,
  hourlyRate: number
): number {
  const secondlyRate = hourlyRate / 60 / 60;
  const secondsElapsed = Math.abs(timeEnd.diff(timeStart, 'seconds'));
  return secondsElapsed * secondlyRate;
}

export function formatAmountToCurrency(amount: number, currencySymbol?: string): string {
  const userLang = navigator.language ?? 'en-US';
  const currencyNumber = new Intl.NumberFormat(userLang, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  if (currencySymbol) {
    return `${currencySymbol} ${currencyNumber}`;
  }
  return `${currencyNumber}`;
}
