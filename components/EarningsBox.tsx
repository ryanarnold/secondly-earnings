import { LinearProgress } from '@mui/material';
import React from 'react';

interface Props {}

function EarningsBox({}: Props) {
  return (
    <div>
      <p>Today you&apos;ve earned</p>
      <h1>₿ 1,245.45</h1>
      <p>You&apos;re 74% done with your day!</p>
      <LinearProgress variant="determinate" value={74} />
    </div>
  );
}

export default EarningsBox;
