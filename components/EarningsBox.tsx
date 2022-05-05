import LinearProgress from '@mui/material/LinearProgress';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Paper, Stack, Typography } from '@mui/material';
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

    const amountFormatted = formatAmountToCurrency(
      isWorking ? amountSoFar : amountTotal,
      currencySymbol
    );

    setCurrentAmount(amountFormatted);
    setPercentageDone(isWorking ? Math.floor((amountSoFar / amountTotal) * 100) : 100);

    setTimeout(updateCurrentAmount, 1000);
  };

  useEffect(() => {
    updateCurrentAmount();
  }, []);

  const gridStyles = {
    textAlign: 'center',
    padding: '2rem',
  };

  const progressBarStyles = {
    height: '1rem',
    borderRadius: 5,
    backgroundColor: '#E0AAFF',
    '& .MuiLinearProgress-bar': {
      backgroundColor: '#C77DFF',
      borderRadius: 5,
    },
  };

  const paperStyle = {
    borderRadius: 8,
  };

  return (
    <Paper elevation={3} sx={paperStyle}>
      <Stack sx={gridStyles} spacing={3}>
        <Typography variant="h5">Today you&apos;ve earned</Typography>
        <Typography variant="h2" letterSpacing={10} fontWeight="bold">
          {currentAmount}
        </Typography>
        <Typography variant="subtitle2">
          You&apos;re {percentageDone}% done with your day!
        </Typography>
        <LinearProgress variant="determinate" value={percentageDone} sx={progressBarStyles} />
      </Stack>
    </Paper>
  );
}

export default EarningsBox;
