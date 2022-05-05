import { LinearProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import {
  END_TIME,
  getTimeFromLocalStorage,
  HOURLY_RATE,
  START_TIME,
  getNumberFromLocalStorage,
  getStringFromLocalStorage,
  CURRENCY,
} from '../utils/user-settings';
import { calculateAmountEarned, formatAmountToCurrency } from '../utils/number-utils';

function EarningsBox() {
  const [currentAmount, setCurrentAmount] = useState('0');
  const [percentageDone, setPercentageDone] = useState(0);

  const updateCurrentAmount = () => {
    const currencySymbol = getStringFromLocalStorage(CURRENCY, '₿');
    const hourlyRate = getNumberFromLocalStorage(HOURLY_RATE, 638);
    const timeStart = getTimeFromLocalStorage(START_TIME, 9, 0);
    const timeEnd = getTimeFromLocalStorage(END_TIME, 18, 0);
    const timeNow = moment();

    const amountSoFar = calculateAmountEarned(timeStart, timeNow, hourlyRate);
    const amountTotal = calculateAmountEarned(timeStart, timeEnd, hourlyRate);

    const isWorking = timeNow > timeStart && timeNow < timeEnd;

    const amountFormatted = formatAmountToCurrency(isWorking ? amountSoFar : amountTotal);

    setCurrentAmount(amountFormatted);
    setPercentageDone(Math.floor((amountSoFar / amountTotal) * 100));

    setTimeout(updateCurrentAmount, 1000);
  };

  useEffect(() => {
    updateCurrentAmount();
  }, []);

  const clearStorage = () => {
    localStorage.clear();
  };

  return (
    <div>
      <p>Today you&apos;ve earned</p>
      <h1>{currentAmount}</h1>
      <p>You&apos;re {percentageDone}% done with your day!</p>
      <LinearProgress variant="determinate" value={percentageDone} />
    </div>
  );
}

export default EarningsBox;
