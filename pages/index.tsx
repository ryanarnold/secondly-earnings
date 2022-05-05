/* eslint-disable react/function-component-definition */
import styled from '@emotion/styled';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import EarningsBox from '../components/EarningsBox';
import Layout from '../components/Layout';
import SettingsForm from '../components/SettingsForm';

const boxStyle = {
  backgroundColor: '#9D4EDD',
  height: '80%',
  width: '100%',
};

function Home() {
  return (
    <Box>
      <Box sx={boxStyle} pb={7}>
        <Container maxWidth="md">
          <Typography variant="h2" fontWeight="bold" color="white" align="center" pt={7} mb={5}>
            Secondly Earnings
          </Typography>
        </Container>
        <Container maxWidth="sm">
          <EarningsBox />
        </Container>
        <Container maxWidth="md">
          {/* <Typography variant="h5" fontWeight="bold" align="center" color="white" pt={5} mb={5}>
          be insired... by money 🤑
        </Typography> */}
          <Typography variant="h6" color="white" align="center" mt={5}>
            Become more productive and inspired at work by having a constant reminder of much money
            you&apos;ve made since starting the workday
          </Typography>
        </Container>
      </Box>
      <Box mt={5} mb={10}>
        <Container maxWidth="sm">
          <SettingsForm landing />
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
