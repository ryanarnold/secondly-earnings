import LinearProgress from '@mui/material/LinearProgress';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Container, Paper, Stack, styled, Typography } from '@mui/material';
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
  // TODO: FIX THIS!!
  const [currentAmount, setCurrentAmount] = useState('0');
  const [percentageDone, setPercentageDone] = useState(0);
  const [currencySymbol, setCurrencySymbol] = useState('₿');
  const [currentDigit0, setCurrentDigit0] = useState('roll-0');
  const [currentDigit1, setCurrentDigit1] = useState('roll-0');
  const [currentDigit2, setCurrentDigit2] = useState('roll-0');
  const [currentDigit3, setCurrentDigit3] = useState('roll-0');
  const [currentDigit4, setCurrentDigit4] = useState('roll-0');
  const [currentDigit5, setCurrentDigit5] = useState('roll-0');
  const [currentDigit6, setCurrentDigit6] = useState('roll-0');
  const [currentDigit7, setCurrentDigit7] = useState('roll-0');
  const [currentDigit8, setCurrentDigit8] = useState('roll-0');
  const [currentDigit9, setCurrentDigit9] = useState('roll-0');
  const [currentDigit0Margin, setCurrentDigit0Margin] = useState('0');
  const [currentDigit1Margin, setCurrentDigit1Margin] = useState('0');
  const [currentDigit2Margin, setCurrentDigit2Margin] = useState('0');
  const [currentDigit3Margin, setCurrentDigit3Margin] = useState('0');
  const [currentDigit4Margin, setCurrentDigit4Margin] = useState('0');
  const [currentDigit5Margin, setCurrentDigit5Margin] = useState('0');
  const [currentDigit6Margin, setCurrentDigit6Margin] = useState('0');
  const [currentDigit7Margin, setCurrentDigit7Margin] = useState('0');
  const [currentDigit8Margin, setCurrentDigit8Margin] = useState('0');
  const [currentDigit9Margin, setCurrentDigit9Margin] = useState('0');

  const updateNumber = (num: string) => {
    const numStr = num.padStart(10).split('');

    numStr.forEach((c, index) => {
      let indexToRollTo: string;

      switch (index) {
        case 0:
          indexToRollTo = c === ' ' ? '10' : c;
          setCurrentDigit0(`roll-${indexToRollTo}`);
          break;
        case 1:
          indexToRollTo = c === ' ' ? '10' : c;
          setCurrentDigit1(`roll-${indexToRollTo}`);
          break;
        case 2:
          indexToRollTo = c === ' ' ? '10' : c;
          setCurrentDigit2(`roll-${indexToRollTo}`);
          break;
        case 3:
          indexToRollTo = c === ' ' ? '10' : '0';
          setCurrentDigit3(`roll-${indexToRollTo}`);
          break;
        case 4:
          indexToRollTo = c === ' ' ? '10' : c;
          setCurrentDigit4(`roll-${indexToRollTo}`);
          break;
        case 5:
          indexToRollTo = c === ' ' ? '10' : c;
          setCurrentDigit5(`roll-${indexToRollTo}`);
          break;
        case 6:
          indexToRollTo = c === ' ' ? '10' : c;
          setCurrentDigit6(`roll-${indexToRollTo}`);
          break;
        case 8:
          indexToRollTo = c === ' ' ? '10' : c;
          setCurrentDigit8(`roll-${indexToRollTo}`);
          break;
        case 9:
          indexToRollTo = c === ' ' ? '10' : c;
          setCurrentDigit9(`roll-${indexToRollTo}`);
          break;
        default:
          break;
      }
    });
  };

  const updateCurrentAmount = () => {
    const hourlyRate = getNumberFromLocalStorage(HOURLY_RATE, 30);
    const timeNow = moment();

    const defaultHourStart = timeNow.hour() - 7;
    const defaultHourEnd = timeNow.hour() + 1;

    const timeStart = getTimeFromLocalStorage(START_TIME, defaultHourStart, 0);
    const timeEnd = getTimeFromLocalStorage(END_TIME, defaultHourEnd, 0);

    const amountSoFar = calculateAmountEarned(timeStart, timeNow, hourlyRate);
    const amountTotal = calculateAmountEarned(timeStart, timeEnd, hourlyRate);

    const isWorking = timeNow > timeStart && timeNow < timeEnd;

    const amountFormatted = formatAmountToCurrency(isWorking ? amountSoFar : amountTotal);

    // setCurrentAmount(amountFormatted);
    setPercentageDone(isWorking ? Math.floor((amountSoFar / amountTotal) * 100) : 100);

    updateNumber(amountFormatted);
  };

  const initializeCurrency = () => {
    const savedCurrencySymbol = getStringFromLocalStorage(CURRENCY, '₿');
    setCurrencySymbol(savedCurrencySymbol);
  };

  const setRandomInterval = (intervalFunction: any, minDelay: any, maxDelay: any) => {
    let timeout: any;

    const runInterval = () => {
      const timeoutFunction = () => {
        intervalFunction();
        runInterval();
      };

      const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;

      timeout = setTimeout(timeoutFunction, delay);
    };

    runInterval();

    return {
      clear() {
        clearTimeout(timeout);
      },
    };
  };

  useEffect(() => {
    clearInterval();
    initializeCurrency();
    updateCurrentAmount();
    setRandomInterval(
      () => {
        updateCurrentAmount();
      },
      2000,
      4000
    );
  }, []);

  useEffect(() => {
    const currentIndex = currentDigit0.split('-')[1];
    document.getElementById('digit-0')?.addEventListener('animationend', () => {
      setCurrentDigit0Margin(currentIndex);
    });
  }, [currentDigit0]);

  useEffect(() => {
    const currentIndex = currentDigit1.split('-')[1];
    document.getElementById('digit-1')?.addEventListener('animationend', () => {
      setCurrentDigit1Margin(currentIndex);
    });
  }, [currentDigit1]);

  useEffect(() => {
    const currentIndex = currentDigit2.split('-')[1];
    document.getElementById('digit-2')?.addEventListener('animationend', () => {
      setCurrentDigit2Margin(currentIndex);
    });
  }, [currentDigit2]);

  useEffect(() => {
    const currentIndex = currentDigit3.split('-')[1];
    document.getElementById('digit-3')?.addEventListener('animationend', () => {
      setCurrentDigit3Margin(currentIndex);
    });
  }, [currentDigit3]);

  useEffect(() => {
    const currentIndex = currentDigit4.split('-')[1];
    document.getElementById('digit-4')?.addEventListener('animationend', () => {
      setCurrentDigit4Margin(currentIndex);
    });
  }, [currentDigit4]);

  useEffect(() => {
    const currentIndex = currentDigit5.split('-')[1];
    document.getElementById('digit-5')?.addEventListener('animationend', () => {
      setCurrentDigit5Margin(currentIndex);
    });
  }, [currentDigit5]);

  useEffect(() => {
    const currentIndex = currentDigit6.split('-')[1];
    document.getElementById('digit-6')?.addEventListener('animationend', () => {
      setCurrentDigit6Margin(currentIndex);
    });
  }, [currentDigit6]);

  useEffect(() => {
    const currentIndex = currentDigit7.split('-')[1];
    document.getElementById('digit-7')?.addEventListener('animationend', () => {
      setCurrentDigit7Margin(currentIndex);
    });
  }, [currentDigit7]);

  useEffect(() => {
    const currentIndex = currentDigit8.split('-')[1];
    document.getElementById('digit-8')?.addEventListener('animationend', () => {
      setCurrentDigit8Margin(currentIndex);
    });
  }, [currentDigit8]);

  useEffect(() => {
    const currentIndex = currentDigit9.split('-')[1];
    document.getElementById('digit-9')?.addEventListener('animationend', () => {
      setCurrentDigit9Margin(currentIndex);
    });
  }, [currentDigit9]);

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

  const DigitsCounter = styled('div')`
    height: 1em;
    overflow: hidden;
    font-size: 300%;
    font-weight: bold;
  `;

  const DigitsList = styled('ul')`
    float: left;
    list-style-type: none;
    font-size: 1em;
    line-height: 1em;
    margin-top: 0em;
    animation-duration: 0.5s;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
    padding-left: 10px;
    color: black;
  `;

  const Digit0 = styled(DigitsList)`
    margin-top: -${currentDigit0Margin}em;
  `;

  const Digit1 = styled(DigitsList)`
    margin-top: -${currentDigit1Margin}em;
  `;

  const Digit2 = styled(DigitsList)`
    margin-top: -${currentDigit2Margin}em;
  `;

  const Digit3 = styled(DigitsList)`
    margin-top: -${currentDigit3Margin}em;
  `;

  const Digit4 = styled(DigitsList)`
    margin-top: -${currentDigit4Margin}em;
  `;

  const Digit5 = styled(DigitsList)`
    margin-top: -${currentDigit5Margin}em;
  `;

  const Digit6 = styled(DigitsList)`
    margin-top: -${currentDigit6Margin}em;
  `;

  const Digit7 = styled(DigitsList)`
    margin-top: -${currentDigit7Margin}em;
  `;

  const Digit8 = styled(DigitsList)`
    margin-top: -${currentDigit8Margin}em;
  `;

  const Digit9 = styled(DigitsList)`
    margin-top: -${currentDigit9Margin}em;
  `;

  return (
    <Paper elevation={3} sx={paperStyle}>
      <Stack sx={gridStyles} spacing={3}>
        <Typography variant="h5">Today you&apos;ve earned</Typography>
        <Typography variant="h2" letterSpacing={10} fontWeight="bold">
          {/* {currentAmount} */}
        </Typography>
        <Stack direction="row" justifyContent="center">
          <Typography variant="h3" fontWeight="bold">
            {currencySymbol}
          </Typography>
          <DigitsCounter className="animated">
            <Digit0 id="digit-0" className={currentDigit0}>
              <li>0</li>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
              <li>9</li>
              <li> </li>
            </Digit0>
            <Digit1 id="digit-1" className={currentDigit1}>
              <li>0</li>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
              <li>9</li>
              <li> </li>
            </Digit1>
            <Digit2 id="digit-2" className={currentDigit2}>
              <li>0</li>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
              <li>9</li>
              <li> </li>
            </Digit2>
            <Digit3 id="digit-3" className={currentDigit3}>
              <li>,</li>
              <li>⠀</li>
              <li>⠀</li>
              <li>⠀</li>
              <li>⠀</li>
              <li>⠀</li>
              <li>⠀</li>
              <li>⠀</li>
              <li>⠀</li>
              <li>⠀</li>
              <li>⠀</li>
            </Digit3>
            <Digit4 id="digit-4" className={currentDigit4}>
              <li>0</li>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
              <li>9</li>
            </Digit4>
            <Digit5 id="digit-5" className={currentDigit5}>
              <li>0</li>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
              <li>9</li>
            </Digit5>
            <Digit6 id="digit-6" className={currentDigit6}>
              <li>0</li>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
              <li>9</li>
            </Digit6>
            <DigitsList id="decimal">
              <li>.</li>
            </DigitsList>
            <Digit8 id="digit-8" className={currentDigit8}>
              <li>0</li>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
              <li>9</li>
            </Digit8>
            <Digit9 id="digit-9" className={currentDigit9}>
              <li>0</li>
              <li>1</li>
              <li>2</li>
              <li>3</li>
              <li>4</li>
              <li>5</li>
              <li>6</li>
              <li>7</li>
              <li>8</li>
              <li>9</li>
            </Digit9>
          </DigitsCounter>
        </Stack>
        <Typography variant="subtitle2">
          You&apos;re {percentageDone}% done with your day!
        </Typography>
        <LinearProgress variant="determinate" value={percentageDone} sx={progressBarStyles} />
      </Stack>
    </Paper>
  );
}

export default EarningsBox;
