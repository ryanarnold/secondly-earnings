import Button from '@mui/material/Button';
import React from 'react';
import EarningsBox from '../components/EarningsBox';

interface Props {}

function EarningsPage() {
  return (
    <div>
      <EarningsBox />
      <Button variant="contained" href="/settings">
        Change Settings
      </Button>
    </div>
  );
}

export default EarningsPage;
