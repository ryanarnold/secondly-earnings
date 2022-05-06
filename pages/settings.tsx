import styled from '@emotion/styled';
import { Container } from '@mui/material';
import React from 'react';
import SettingsForm from '../components/SettingsForm';

const StyledContainer = styled(Container)`
  margin-top: 5%;
`;

function SettingsPage() {
  return (
    <StyledContainer maxWidth="sm">
      <SettingsForm landing={false} />
    </StyledContainer>
  );
}

export default SettingsPage;
