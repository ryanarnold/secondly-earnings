import styled from '@emotion/styled';
import { ThemeProvider, createTheme, Container, Stack, CssBaseline } from '@mui/material';
import Button from '@mui/material/Button';
import React from 'react';
import EarningsBox from '../components/EarningsBox';

interface Props {}

const theme = createTheme({
  palette: {
    primary: {
      main: '#C77DFF',
      contrastText: 'white',
    },
    secondary: {
      main: '#fff',
      contrastText: '#C77DFF',
      dark: '#e4e4e4',
    },
    background: {
      default: '#E0AAFF',
    },
  },
});

const buttonStyle = {
  borderRadius: 3,
  textTransform: 'capitalize',
  fontSize: '1.2rem',
};

const StyledStack = styled(Stack)`
  margin-top: 30%;

  @media (max-height: 500px) {
    margin-top: 5%;
  }
`;

function EarningsPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm">
        <StyledStack spacing={5}>
          <EarningsBox />
          <Button variant="contained" href="/settings" sx={buttonStyle} color="secondary">
            Change Settings
          </Button>
        </StyledStack>
      </Container>
    </ThemeProvider>
  );
}

export default EarningsPage;
