import { Container } from '@mui/material';
import React from 'react';

interface Props {
  children: any;
}

function Layout({ children }: Props) {
  return <Container>{children}</Container>;
}

export default Layout;
